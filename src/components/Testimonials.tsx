import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';

export default function Testimonials() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-10 right-10 text-blue-500/5 text-[20rem] font-bold leading-none select-none pointer-events-none">
        "
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-medium tracking-wide">Client Love</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5">
            What Our <span className="text-blue-600">Clients Say</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Don't just take our word for it. Here's what our satisfied clients
            have to say about working with Flystone Interiors.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.name}
              className="group relative bg-slate-50 rounded-2xl p-8 transition-all duration-500 hover:bg-white hover:shadow-2xl border border-slate-100"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Quote icon */}
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5 group-hover:bg-blue-500 transition-all duration-500">
                <Quote className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-500" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-blue-400 text-blue-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-700 leading-relaxed mb-6 text-sm">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
