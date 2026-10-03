import { Phone, Mail, MapPin, Youtube, Instagram, ArrowRight } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Fly<span className="text-blue-400">stone</span> Interiors
            </h3>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              {COMPANY.description}
            </p>
            <div className="flex gap-3">
              <a
                href={COMPANY.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={COMPANY.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-pink-600 flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Our Process', href: '#process' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wider uppercase">
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                'Residential Design',
                'Commercial Spaces',
                'Modular Kitchens',
                'Living Room Design',
                'Bedroom Design',
                'Custom Decor',
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wider uppercase">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">{COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div className="text-sm text-slate-400">
                  <a href={`tel:${COMPANY.phone1}`} className="block hover:text-blue-400 transition-colors">
                    {COMPANY.phone1}
                  </a>
                  <a href={`tel:${COMPANY.phone2}`} className="block hover:text-blue-400 transition-colors">
                    {COMPANY.phone2}
                  </a>
                  <a href={`tel:${COMPANY.phoneLandline}`} className="block hover:text-blue-400 transition-colors">
                    {COMPANY.phoneLandline}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div className="text-sm text-slate-400">
                  <a href={`mailto:${COMPANY.email1}`} className="block hover:text-blue-400 transition-colors break-all">
                    {COMPANY.email1}
                  </a>
                  <a href={`mailto:${COMPANY.email2}`} className="block hover:text-blue-400 transition-colors break-all">
                    {COMPANY.email2}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Service Areas */}
        <div className="border-t border-slate-800 pt-8 pb-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
            <span className="font-semibold text-slate-400">Serving:</span>
            {COMPANY.serviceAreas.map((area, i) => (
              <span key={area} className="flex items-center gap-4">
                {i > 0 && <span className="text-slate-700">|</span>}
                <span>{area}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#home" className="text-sm text-slate-500 hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#home" className="text-sm text-slate-500 hover:text-blue-400 transition-colors">
              Terms of Service
            </a>
            <a
              href="/admin"
              className="text-sm text-slate-600 hover:text-blue-400 transition-colors"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
