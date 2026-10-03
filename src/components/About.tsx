import { CheckCircle2, Award, Users, MapPin } from 'lucide-react';
import { COMPANY, STATS } from '@/lib/constants';

const ABOUT_IMAGE_1 =
  'https://images.pexels.com/photos/7546323/pexels-photo-7546323.jpeg?auto=compress&cs=tinysrgb&w=800';
const ABOUT_IMAGE_2 =
  'https://images.pexels.com/photos/27164969/pexels-photo-27164969.jpeg?auto=compress&cs=tinysrgb&w=600';

const HIGHLIGHTS = [
  'Award-winning interior design team',
  'Personalized design approach for every client',
  'Premium materials and quality craftsmanship',
  'On-time project delivery, every time',
  'Transparent pricing with no hidden costs',
  'End-to-end project management from concept to handover',
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={ABOUT_IMAGE_1}
                  alt="Modern living room interior"
                  className="rounded-2xl shadow-xl w-full h-64 object-cover"
                />
                <img
                  src={ABOUT_IMAGE_2}
                  alt="Contemporary interior design"
                  className="rounded-2xl shadow-xl w-full h-48 object-cover"
                />
              </div>
              <div className="pt-8">
                <img
                  src={ABOUT_IMAGE_1}
                  alt="Luxury interior space"
                  className="rounded-2xl shadow-xl w-full h-72 object-cover"
                />
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl hidden md:block">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold">5+</div>
                  <div className="text-xs text-slate-400">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 mb-5">
              <span className="text-sm font-medium tracking-wide">About Flystone Interiors</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Where Vision Meets <span className="text-blue-600">Craftsmanship</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              At {COMPANY.name}, we believe every space tells a story. Based in {COMPANY.addressShort},
              we have been transforming residential and commercial spaces across {COMPANY.serviceAreas.join(', ')}
              {' '}for over 5 years. Our team of expert designers and skilled craftsmen work together
              to bring your vision to life with unparalleled attention to detail.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {HIGHLIGHTS.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 pt-8 border-t border-slate-200">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
