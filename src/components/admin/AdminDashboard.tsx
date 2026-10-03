import { useState, useEffect, useCallback } from 'react';
import type { Session } from '@supabase/supabase-js';
import {
  LayoutDashboard,
  ImagePlus,
  Mail,
  LogOut,
  Trash2,
  Upload,
  Star,
  StarOff,
  Check,
  CheckCheck,
  Phone,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { supabase, STORAGE_BUCKET, type PortfolioImage, type ContactQuery } from '@/lib/supabase';
import { CATEGORIES } from '@/lib/constants';
import ImageUploader from './ImageUploader';

type Tab = 'overview' | 'images' | 'queries';

export default function AdminDashboard({
  session,
  onLogout,
}: {
  session: Session;
  onLogout: () => void;
}) {
  const [tab, setTab] = useState<Tab>('overview');
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [imgRes, queryRes] = await Promise.all([
        supabase
          .from('portfolio_images')
          .select('*')
          .order('display_order', { ascending: true })
          .order('created_at', { ascending: false }),
        supabase
          .from('contact_queries')
          .select('*')
          .order('created_at', { ascending: false }),
      ]);

      if (imgRes.data) setImages(imgRes.data as PortfolioImage[]);
      if (queryRes.data) setQueries(queryRes.data as ContactQuery[]);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    const { error } = await supabase.from('portfolio_images').delete().eq('id', id);
    if (error) {
      alert('Failed to delete: ' + error.message);
      return;
    }
    setImages(images.filter((img) => img.id !== id));
  };

  const handleToggleFeatured = async (img: PortfolioImage) => {
    const { error } = await supabase
      .from('portfolio_images')
      .update({ is_featured: !img.is_featured })
      .eq('id', img.id);
    if (error) {
      alert('Failed to update: ' + error.message);
      return;
    }
    setImages(images.map((i) => (i.id === img.id ? { ...i, is_featured: !i.is_featured } : i)));
  };

  const handleMarkRead = async (q: ContactQuery) => {
    const { error } = await supabase
      .from('contact_queries')
      .update({ is_read: true })
      .eq('id', q.id);
    if (error) return;
    setQueries(queries.map((qq) => (qq.id === q.id ? { ...qq, is_read: true } : qq)));
  };

  const handleDeleteQuery = async (id: string) => {
    if (!confirm('Delete this query permanently?')) return;
    const { error } = await supabase.from('contact_queries').delete().eq('id', id);
    if (error) {
      alert('Failed to delete: ' + error.message);
      return;
    }
    setQueries(queries.filter((q) => q.id !== id));
  };

  const unreadCount = queries.filter((q) => !q.is_read).length;

  const navItems: { key: Tab; label: string; icon: typeof LayoutDashboard; badge?: number }[] = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'images', label: 'Portfolio', icon: ImagePlus },
    { key: 'queries', label: 'Queries', icon: Mail, badge: unreadCount },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-slate-900 to-blue-950 text-white flex flex-col fixed h-screen z-20">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-sm font-bold text-white">F</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">
                Fly<span className="text-blue-400">stone</span>
              </h1>
              <p className="text-slate-500 text-[10px] tracking-wider uppercase">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${
                  tab === item.key
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
                {item.badge ? (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700/50 space-y-2">
          <a
            href="/"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800/50 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            View Website
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-950/50 transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : (
          <>
            {tab === 'overview' && (
              <OverviewTab
                images={images}
                queries={queries}
                unreadCount={unreadCount}
                onTabChange={setTab}
              />
            )}
            {tab === 'images' && (
              <ImagesTab
                images={images}
                onDelete={handleDeleteImage}
                onToggleFeatured={handleToggleFeatured}
                onRefresh={loadData}
              />
            )}
            {tab === 'queries' && (
              <QueriesTab
                queries={queries}
                onMarkRead={handleMarkRead}
                onDelete={handleDeleteQuery}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

function OverviewTab({
  images,
  queries,
  unreadCount,
  onTabChange,
}: {
  images: PortfolioImage[];
  queries: ContactQuery[];
  unreadCount: number;
  onTabChange: (t: Tab) => void;
}) {
  const featuredCount = images.filter((i) => i.is_featured).length;
  const categoryCount = new Set(images.map((i) => i.category)).size;

  const cards = [
    { label: 'Total Images', value: images.length, icon: ImagePlus, color: 'blue' },
    { label: 'Featured', value: featuredCount, icon: Star, color: 'cyan' },
    { label: 'Categories', value: categoryCount, icon: LayoutDashboard, color: 'teal' },
    { label: 'Total Queries', value: queries.length, icon: Mail, color: 'indigo' },
    { label: 'Unread Queries', value: unreadCount, icon: Mail, color: 'red' },
  ];

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    cyan: 'bg-cyan-100 text-cyan-600',
    teal: 'bg-teal-100 text-teal-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    red: 'bg-red-100 text-red-600',
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-stone-900 mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 rounded-xl ${colorMap[card.color]} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-stone-900">{card.value}</div>
              <div className="text-sm text-stone-500 mt-1">{card.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent queries */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-stone-900">Recent Queries</h3>
          <button
            onClick={() => onTabChange('queries')}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
          </button>
        </div>
        {queries.length === 0 ? (
          <p className="text-stone-400 text-sm py-8 text-center">No queries yet.</p>
        ) : (
          <div className="space-y-3">
            {queries.slice(0, 5).map((q) => (
              <div
                key={q.id}
                className={`flex items-center gap-4 p-3 rounded-xl ${
                  q.is_read ? 'bg-slate-50' : 'bg-blue-50'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-stone-900">{q.name}</span>
                    {!q.is_read && (
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-stone-500 truncate">{q.message}</p>
                </div>
                <span className="text-xs text-stone-400 flex-shrink-0">
                  {new Date(q.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ImagesTab({
  images,
  onDelete,
  onToggleFeatured,
  onRefresh,
}: {
  images: PortfolioImage[];
  onDelete: (id: string) => void;
  onToggleFeatured: (img: PortfolioImage) => void;
  onRefresh: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-stone-900">Portfolio Images</h2>
      </div>

      {/* Upload section */}
      <ImageUploader onUploaded={onRefresh} />

      {/* Existing images */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-stone-900 mb-4">
          All Images ({images.length})
        </h3>
        {images.length === 0 ? (
          <p className="text-stone-400 text-sm py-8 text-center bg-white rounded-2xl">
            No images uploaded yet. Use the form above to add your first image.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={img.image_url}
                    alt={img.title}
                    className="w-full h-full object-cover"
                  />
                  {img.is_featured && (
                    <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-medium text-stone-900 text-sm truncate">{img.title}</h4>
                    <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full flex-shrink-0">
                      {img.category}
                    </span>
                  </div>
                  {img.description && (
                    <p className="text-xs text-stone-500 line-clamp-2 mb-3">{img.description}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleFeatured(img)}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 transition-colors"
                    >
                      {img.is_featured ? (
                        <>
                          <StarOff className="w-3 h-3" /> Unfeature
                        </>
                      ) : (
                        <>
                          <Star className="w-3 h-3" /> Feature
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => onDelete(img.id)}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors ml-auto"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function QueriesTab({
  queries,
  onMarkRead,
  onDelete,
}: {
  queries: ContactQuery[];
  onMarkRead: (q: ContactQuery) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-stone-900 mb-6">Customer Queries</h2>

      {queries.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <Mail className="w-12 h-12 text-stone-300 mx-auto mb-4" />
          <p className="text-stone-400">No queries received yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {queries.map((q) => (
            <div
              key={q.id}
              className={`bg-white rounded-2xl p-6 shadow-sm ${
                !q.is_read ? 'border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-stone-900">{q.name}</h3>
                    {!q.is_read && (
                      <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500">
                    <a href={`mailto:${q.email}`} className="hover:text-blue-600 transition-colors">
                      {q.email}
                    </a>
                    {q.phone && (
                      <a href={`tel:${q.phone}`} className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                        <Phone className="w-3 h-3" />
                        {q.phone}
                      </a>
                    )}
                    {q.service_type && (
                      <span className="bg-stone-100 px-2 py-0.5 rounded-full text-xs">
                        {q.service_type}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-stone-400 flex-shrink-0">
                  {new Date(q.created_at).toLocaleString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              <p className="text-stone-700 text-sm leading-relaxed bg-stone-50 rounded-xl p-4 mb-4">
                {q.message}
              </p>

              <div className="flex items-center gap-2">
                {!q.is_read && (
                  <button
                    onClick={() => onMarkRead(q)}
                    className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition-colors"
                  >
                    <CheckCheck className="w-4 h-4" />
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => onDelete(q.id)}
                  className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors ml-auto"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
