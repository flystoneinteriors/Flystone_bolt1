import { PROCESS_STEPS } from '@/lib/constants';
import { Check } from 'lucide-react';

export default function Process() {
  return (
    <section id="process" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-5">
            <span className="text-blue-300 text-sm font-medium tracking-wide">How We Work</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Our <span className="text-blue-400">Process</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            A streamlined, transparent approach that ensures your project is
            delivered to perfection, every step of the way.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, idx) => (
            <div key={step.number} className="relative group">
              {/* Connector line */}
              {idx < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
              )}

              <div className="relative">
                {/* Number circle with check */}
                <div className="w-24 h-24 rounded-full bg-slate-900 border-2 border-blue-500/30 flex items-center justify-center mb-6 group-hover:border-blue-500 group-hover:bg-blue-500/10 group-hover:scale-110 transition-all duration-500">
                  <span className="text-3xl font-bold text-blue-400 group-hover:scale-110 transition-transform duration-500">
                    {step.number}
                  </span>
                  {/* Check badge */}
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
