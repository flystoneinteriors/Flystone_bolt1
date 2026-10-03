import { useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminPortal({ session }: { session: Session | null }) {
  const [view, setView] = useState<'login' | 'dashboard'>(
    session ? 'dashboard' : 'login'
  );

  if (!session || view === 'login') {
    return <AdminLogin onLoggedIn={() => setView('dashboard')} session={session} />;
  }

  return <AdminDashboard session={session} onLogout={() => setView('login')} />;
}
