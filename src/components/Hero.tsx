import { ArrowRight, Play, Star } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

const HERO_IMAGE =
  'https://images.pexels.com/photos/8135492/pexels-photo-8135492.jpeg?auto=compress&cs=tinysrgb&w=1920';

const HERO_STATS = [
  { value: '50+', label: 'Projects' },
  { value: '5+', label: 'Years' },
  { value: '3', label: 'States' },
  { value: '100%', label: 'Satisfaction' },
];

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Luxury interior design by Flystone Interiors"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6 animate-[fadeIn_0.8s_ease-out]">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-300 text-sm font-medium tracking-wide">
              Premium Interior Designers in Hyderabad
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 animate-[fadeIn_1s_ease-out]">
            Crafting Spaces
            <br />
            That <span className="text-blue-400">Inspire</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl animate-[fadeIn_1.2s_ease-out]">
            {COMPANY.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-[fadeIn_1.4s_ease-out]">
            <button
              onClick={() => scrollTo('#contact')}
              className="group flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-lg shadow-lg shadow-blue-500/20"
            >
              Get a Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo('#portfolio')}
              className="group flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-lg border border-white/20"
            >
              <Play className="w-5 h-5" />
              View Our Work
            </button>
          </div>

          {/* Rating badge */}
          <div className="flex items-center gap-3 mt-8 mb-2 animate-[fadeIn_1.5s_ease-out]">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-blue-400 text-blue-400" />
              ))}
            </div>
            <span className="text-slate-300 text-sm">Rated 5.0 by 50+ happy clients</span>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-4 gap-4 sm:gap-8 mt-10 pt-8 border-t border-white/10 animate-[fadeIn_1.6s_ease-out]">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="group">
                <div className="text-3xl sm:text-4xl font-bold text-blue-400 group-hover:scale-110 transition-transform duration-300 cursor-default">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
