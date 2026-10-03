import {
  Home,
  Building2,
  Lightbulb,
  Sofa,
  BedDouble,
  Palette,
  ArrowUpRight,
} from 'lucide-react';
import { SERVICES } from '@/lib/constants';

const ICON_MAP: Record<string, typeof Home> = {
  Home,
  Building2,
  Lightbulb,
  Sofa,
  BedDouble,
  Palette,
};

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-medium tracking-wide">What We Do</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            From concept to completion, we offer comprehensive interior design services
            tailored to your unique needs and preferences.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => {
            const Icon = ICON_MAP[service.icon] || Home;
            return (
              <div
                key={service.title}
                className="group relative bg-slate-50 rounded-2xl p-8 transition-all duration-500 hover:bg-slate-900 hover:shadow-2xl overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-12 translate-x-12 group-hover:bg-blue-500/10 transition-all duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-all duration-500">
                    <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-white transition-colors duration-500 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 group-hover:text-slate-300 transition-colors duration-500 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-400 font-medium text-sm">
                    Learn More
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA banner */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden animate-gradient">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-32 -translate-x-32 blur-2xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full translate-y-32 translate-x-32 blur-2xl" />
          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Space?
            </h3>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Let's create something beautiful together. Schedule a free consultation
              with our expert design team today.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-lg shadow-lg shadow-blue-500/20"
            >
              Book Free Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
