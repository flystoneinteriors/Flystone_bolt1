import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { supabase, type PortfolioImage } from '@/lib/supabase';
import { CATEGORIES } from '@/lib/constants';

const FALLBACK_IMAGES: PortfolioImage[] = [
  {
    id: 'fb1',
    title: 'Elegant Living Room',
    category: 'Living Room',
    description: 'A spacious living room with luxurious decor and natural light.',
    image_url: 'https://images.pexels.com/photos/34688219/pexels-photo-34688219.jpeg?auto=compress&cs=tinysrgb&w=1200',
    display_order: 1,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fb2',
    title: 'Modern Bedroom Suite',
    category: 'Bedroom',
    description: 'A serene bedroom with plush bedding and ambient lighting.',
    image_url: 'https://images.pexels.com/photos/8135118/pexels-photo-8135118.jpeg?auto=compress&cs=tinysrgb&w=1200',
    display_order: 2,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fb3',
    title: 'Contemporary Kitchen',
    category: 'Kitchen',
    description: 'Sleek kitchen with modern cabinetry and premium finishes.',
    image_url: 'https://images.pexels.com/photos/7045356/pexels-photo-7045356.jpeg?auto=compress&cs=tinysrgb&w=1200',
    display_order: 3,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fb4',
    title: 'Luxury Lounge',
    category: 'Living Room',
    description: 'A stylish lounge area with elegant furniture and warm tones.',
    image_url: 'https://images.pexels.com/photos/8082243/pexels-photo-8082243.jpeg?auto=compress&cs=tinysrgb&w=1200',
    display_order: 4,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fb5',
    title: 'Minimalist Bedroom',
    category: 'Bedroom',
    description: 'Clean lines and minimalist design for ultimate relaxation.',
    image_url: 'https://images.pexels.com/photos/39017609/pexels-photo-39017609.jpeg?auto=compress&cs=tinysrgb&w=1200',
    display_order: 5,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fb6',
    title: 'Premium Office Space',
    category: 'Office',
    description: 'A professional workspace designed for productivity and style.',
    image_url: 'https://images.pexels.com/photos/7511755/pexels-photo-7511755.jpeg?auto=compress&cs=tinysrgb&w=1200',
    display_order: 6,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fb7',
    title: 'Grand Living Area',
    category: 'Living Room',
    description: 'A grand living space with chandelier and luxurious furnishings.',
    image_url: 'https://images.pexels.com/photos/33529500/pexels-photo-33529500.jpeg?auto=compress&cs=tinysrgb&w=1200',
    display_order: 7,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fb8',
    title: 'Sleek Kitchen Island',
    category: 'Kitchen',
    description: 'Modern kitchen with granite island and contemporary design.',
    image_url: 'https://images.pexels.com/photos/7587864/pexels-photo-7587864.jpeg?auto=compress&cs=tinysrgb&w=1200',
    display_order: 8,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
];

export default function Portfolio() {
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_images')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        setImages(data as PortfolioImage[]);
      } else {
        setImages(FALLBACK_IMAGES);
      }
    } catch {
      setImages(FALLBACK_IMAGES);
    } finally {
      setLoading(false);
    }
  };

  const filtered =
    activeCategory === 'All'
      ? images
      : images.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filtered.length
    );
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filtered.length) % filtered.length
    );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, filtered.length]);

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-medium tracking-wide">Our Work</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5">
            Our <span className="text-blue-600">Portfolio</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Explore our collection of beautifully designed spaces, each crafted
            with passion and precision.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-slate-200 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => openLightbox(idx)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 ${
                  idx % 5 === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
              >
                <div className={`overflow-hidden ${idx % 5 === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                  <img
                    src={img.image_url}
                    alt={img.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <span className="text-blue-400 text-xs font-semibold tracking-wider uppercase mb-1">
                    {img.category}
                  </span>
                  <h3 className="text-white text-lg font-bold">{img.title}</h3>
                  {img.description && (
                    <p className="text-slate-300 text-sm mt-1 line-clamp-2">
                      {img.description}
                    </p>
                  )}
                </div>
                {/* Expand icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ImageIcon className="w-5 h-5 text-white" />
                </div>
                {/* Featured badge */}
                {img.is_featured && (
                  <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                    Featured
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg">No projects in this category yet. Check back soon!</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 sm:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 sm:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div
            className="max-w-5xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightboxIndex].image_url}
              alt={filtered[lightboxIndex].title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <span className="text-blue-400 text-xs font-semibold tracking-wider uppercase">
                {filtered[lightboxIndex].category}
              </span>
              <h3 className="text-white text-xl font-bold mt-1">
                {filtered[lightboxIndex].title}
              </h3>
              {filtered[lightboxIndex].description && (
                <p className="text-slate-400 text-sm mt-2 max-w-2xl">
                  {filtered[lightboxIndex].description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
