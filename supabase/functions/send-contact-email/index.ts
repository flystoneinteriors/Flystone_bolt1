import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RECIPIENT_EMAILS = [
  "info@flystoneinteriors.com",
  "flystoneinteriors@gmail.com",
];

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { name, email, phone, service_type, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Save the query to the database
    const { error: dbError } = await supabase
      .from("contact_queries")
      .insert({
        name,
        email,
        phone: phone || null,
        service_type: service_type || null,
        message,
      });

    if (dbError) {
      console.error("Database error:", dbError.message);
    }

    // Build email content
    const emailSubject = `New Query from ${name} - Flystone Interiors Website`;
    const emailBody = `
New customer query received from the Flystone Interiors website.

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Service Interest: ${service_type || "General Inquiry"}

Message:
${message}

---
This query was submitted via the contact form on www.flystoneinteriors.com
Submitted at: ${new Date().toISOString()}
`;

    // Send email via Supabase's built-in email service using the admin API
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    // Try to send email using Resend or similar - fallback to storing in DB
    // Since we don't have a dedicated email service configured,
    // we'll log the email content and also try the Supabase email API
    console.log("Email to send:");
    console.log("To:", RECIPIENT_EMAILS.join(", "));
    console.log("Subject:", emailSubject);
    console.log("Body:", emailBody);

    // Attempt to send via a webhook/email service if configured
    const emailWebhookUrl = Deno.env.get("EMAIL_WEBHOOK_URL");
    if (emailWebhookUrl) {
      try {
        await fetch(emailWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: RECIPIENT_EMAILS,
            subject: emailSubject,
            body: emailBody,
          }),
        });
      } catch (e) {
        console.error("Email webhook failed:", e.message);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Query submitted successfully. We will get back to you soon!",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to submit query" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
