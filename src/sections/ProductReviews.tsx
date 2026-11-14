import React, { useMemo, useState } from 'react';
import { Star, CheckCircle2, MapPin, Search, Share2, PenSquare } from 'lucide-react';
import { reviews, ratingStats, isDemoData } from '../data/reviews';
import type { Review } from '../data/reviews';
import type { Product } from '../data/products';

/**
 * Product-page reviews, modelled on the review widget used by vimerson.com:
 *  - "Reviews (n)" / "Questions (n)" tabs, star summary + green "Write a review" button
 *  - filter pills: Newest, Oldest, Highest, Lowest, Picture Reviews, Verified Buyer, Most Helpful + search
 *  - vertical review list: avatar, name, stars, title, text with "Read more", date + location, helpful votes
 * Every number comes from src/data/reviews.ts — nothing is shown until real data is added there.
 * TODO client: connect the forms to a review app (Judge.me / Okendo) or backend.
 */

const STAR = '#F5A524';

const Stars: React.FC<{ value: number; size?: string }> = ({ value, size = 'w-4 h-4' }) => (
  <div className="flex" style={{ color: STAR }} aria-label={`${value} out of 5 stars`}>
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`${size} ${i < Math.round(value) ? 'fill-current' : 'text-line'}`} />
    ))}
  </div>
);

const AVATAR_COLORS = ['#E040B8', '#A8AD52', '#2F6B8C', '#9C3D73', '#49BC39', '#E8590C'];
const PAGE = 5;

type SortKey = 'newest' | 'oldest' | 'high' | 'low' | 'helpful';
type FilterKey = SortKey | 'pictures' | 'verified';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'newest', label: 'Newest' },
  { key: 'oldest', label: 'Oldest' },
  { key: 'high', label: 'Highest Rating' },
  { key: 'low', label: 'Lowest Rating' },
  { key: 'pictures', label: 'Picture Reviews' },
  { key: 'verified', label: 'Verified Buyer' },
  { key: 'helpful', label: 'Most Helpful' },
];

const ReviewCard: React.FC<{ rev: Review; index: number }> = ({ rev, index }) => {
  const [open, setOpen] = useState(false);
  const [vote, setVote] = useState<'up' | 'down' | null>(null);
  const long = rev.quote.length > 160;
  const shown = !long || open ? rev.quote : rev.quote.slice(0, 160).trimEnd();

  return (
    <article className="py-6 border-b border-line last:border-0">
      <div className="flex items-start gap-4">
        <span
          className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center text-white font-heading font-medium text-lg"
          style={{ background: AVATAR_COLORS[index % AVATAR_COLORS.length] }}
          aria-hidden="true"
        >
          {rev.name.trim()[0]?.toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-heading font-bold text-ink text-lg">{rev.name}</h3>
              {rev.verified && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-green">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Buyer
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <span>{rev.date}</span>
              {rev.location && (
                <>
                  <span className="text-line">|</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{rev.location}</span>
                </>
              )}
            </div>
          </div>

          <div className="mt-2"><Stars value={rev.rating} size="w-5 h-5" /></div>
          <h4 className="mt-3 font-heading font-bold text-ink text-base">{rev.title}</h4>
          <p className="mt-1.5 text-[15px] text-ink leading-relaxed">
            {shown}
            {long && !open && <>… </>}
            {long && (
              <button onClick={() => setOpen((v) => !v)} className="ml-1 font-semibold underline underline-offset-2 text-ink">
                {open ? 'Show less' : 'Read more'}
              </button>
            )}
          </p>

          {rev.pictures && rev.pictures.length > 0 && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {rev.pictures.map((src) => (
                <img key={src} src={src} alt="Customer photo" loading="lazy" className="w-20 h-20 object-cover rounded-brand border border-line" />
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center gap-4 text-sm text-ink-muted">
            <button
              onClick={() => setVote(vote === 'up' ? null : 'up')}
              aria-pressed={vote === 'up'}
              className={`inline-flex items-center gap-1.5 hover:text-ink ${vote === 'up' ? 'text-ink font-semibold' : ''}`}
              aria-label="Helpful"
            >
              <span className="text-xl leading-none">😀</span> ({(rev.helpful ?? 0) + (vote === 'up' ? 1 : 0)})
            </button>
            <button
              onClick={() => setVote(vote === 'down' ? null : 'down')}
              aria-pressed={vote === 'down'}
              className={`inline-flex items-center gap-1.5 hover:text-ink ${vote === 'down' ? 'text-ink font-semibold' : ''}`}
              aria-label="Not helpful"
            >
              <span className="text-xl leading-none">😖</span> ({vote === 'down' ? 1 : 0})
            </button>
            <span className="h-4 w-px bg-line" aria-hidden="true" />
            <button
              onClick={() => {
                const url = `${window.location.origin}${window.location.pathname}#reviews`;
                if (navigator.share) navigator.share({ title: rev.title, url }).catch(() => {});
                else navigator.clipboard?.writeText(url).catch(() => {});
              }}
              className="hover:text-ink"
              aria-label="Share review"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export const ProductReviews: React.FC<{ product: Product }> = ({ product }) => {
  const [tab, setTab] = useState<'reviews' | 'questions'>('reviews');
  const [filter, setFilter] = useState<FilterKey>('newest');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE);
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newRating, setNewRating] = useState(5);

  const stats = ratingStats(product.name);

  const list = useMemo(() => {
    const parse = (d: string) => Date.parse(d) || 0;
    let r: Review[] = reviews.filter((x) => x.product === product.name);
    const q = query.trim().toLowerCase();
    if (q) r = r.filter((x) => `${x.title} ${x.quote} ${x.name}`.toLowerCase().includes(q));
    if (filter === 'pictures') r = r.filter((x) => x.pictures?.length);
    if (filter === 'verified') r = r.filter((x) => x.verified);
    if (filter === 'oldest') r = [...r].sort((a, b) => parse(a.date) - parse(b.date));
    if (filter === 'newest') r = [...r].sort((a, b) => parse(b.date) - parse(a.date));
    if (filter === 'high') r = [...r].sort((a, b) => b.rating - a.rating);
    if (filter === 'low') r = [...r].sort((a, b) => a.rating - b.rating);
    if (filter === 'helpful') r = [...r].sort((a, b) => (b.helpful ?? 0) - (a.helpful ?? 0));
    return r;
  }, [product.name, filter, query]);

  const pick = (k: FilterKey) => { setFilter(k); setVisible(PAGE); };

  // Hidden until real reviews / ratings exist for this product (data/reviews.ts)
  if (stats.count === 0 && !reviews.some((x) => x.product === product.name)) return null;

  const field = 'px-4 py-3 text-sm bg-bg border border-line rounded-brand focus:outline-none focus:border-ink';

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-bg border-t border-line scroll-mt-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-ink tracking-tight">Product Reviews</h2>
          {isDemoData && (
            <span className="px-2.5 py-1 rounded-full bg-[#FFF3CD] text-[#7A5B00] text-[11px] font-heading font-bold uppercase tracking-wider">
              Demo data — not real reviews
            </span>
          )}
        </div>

        {/* Tabs + summary + write a review */}
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-b border-line">
          <div className="flex gap-1" role="tablist">
            {([
              ['reviews', `Reviews (${stats.count.toLocaleString('en-US')})`],
              ['questions', 'Questions (0)'],
            ] as const).map(([k, label]) => (
              <button
                key={k}
                role="tab"
                aria-selected={tab === k}
                onClick={() => setTab(k)}
                className={`px-5 sm:px-6 py-3 rounded-t-brand text-lg sm:text-xl font-heading font-bold transition-colors ${
                  tab === k ? 'bg-brand-green text-white' : 'text-ink hover:text-brand-green'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 pb-2">
            {stats.count > 0 && (
              <div className="flex items-center gap-2">
                <Stars value={stats.avg} size="w-5 h-5" />
                <span className="text-ink text-base">{stats.count.toLocaleString('en-US')}</span>
              </div>
            )}
            <button
              onClick={() => { setFormOpen((v) => !v); setSubmitted(false); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-brand bg-brand-green text-white text-sm font-heading font-bold uppercase tracking-wide hover:opacity-90 transition-opacity"
            >
              <PenSquare className="w-4 h-4" /> {formOpen ? 'Cancel' : 'Write a review'}
            </button>
          </div>
        </div>

        {/* Write-a-review form */}
        {formOpen && (
          <div className="mt-5 bg-surface rounded-2xl border border-line p-6 sm:p-8">
            {submitted ? (
              <p className="text-center text-sm text-ink">
                <CheckCircle2 className="inline w-4 h-4 text-brand-green mr-1.5 -mt-0.5" />
                Thank you! Your review has been submitted and will appear once approved.
              </p>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); /* TODO client: send to review app / backend */ setSubmitted(true); }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
              >
                <div className="sm:col-span-2">
                  <span className="block text-xs font-heading font-semibold uppercase tracking-wider text-ink-muted mb-2">Rating</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" onClick={() => setNewRating(n)} aria-label={`${n} stars`}>
                        <Star className={`w-7 h-7 ${n <= newRating ? 'fill-current' : 'text-line'}`} style={n <= newRating ? { color: STAR } : undefined} />
                      </button>
                    ))}
                  </div>
                </div>
                <input required placeholder="Your name" className={field} />
                <input required type="email" placeholder="Email (not published)" className={field} />
                <input required placeholder="Review title" className={`sm:col-span-2 ${field}`} />
                <textarea required rows={4} placeholder="Write your review" className={`sm:col-span-2 ${field} resize-y`} />
                <div className="sm:col-span-2 flex justify-end">
                  <button type="submit" className="px-7 py-3 rounded-brand bg-brand-green text-white text-sm font-heading font-bold uppercase tracking-wide hover:opacity-90 transition-opacity">
                    Submit review
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {tab === 'reviews' ? (
          <>
            {/* Filter pills + search */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="font-heading font-bold text-ink mr-1">Filter by:</span>
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => pick(f.key)}
                  aria-pressed={filter === f.key}
                  className={`px-4 py-1.5 rounded-full border text-sm sm:text-base transition-colors ${
                    filter === f.key ? 'bg-brand-green border-brand-green text-white font-semibold' : 'border-line text-ink hover:border-ink'
                  }`}
                >
                  {f.label}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-2">
                {searchOpen && (
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setVisible(PAGE); }}
                    placeholder="Search reviews"
                    className="px-3 py-1.5 text-sm bg-surface border border-line rounded-full focus:outline-none focus:border-ink w-40 sm:w-52"
                  />
                )}
                <button
                  onClick={() => { setSearchOpen((v) => !v); if (searchOpen) setQuery(''); }}
                  className="inline-flex items-center gap-1.5 text-brand-green font-heading font-bold text-sm sm:text-base"
                >
                  <Search className="w-4 h-4 text-ink-muted" /> Search reviews
                </button>
              </div>
            </div>

            {/* Review list */}
            <div className="mt-2">
              {stats.count === 0 && reviews.filter((r) => r.product === product.name).length === 0 ? (
                <div className="py-14 text-center">
                  <div className="flex justify-center mb-3"><Stars value={0} size="w-6 h-6" /></div>
                  <p className="font-heading font-semibold text-ink">No reviews yet</p>
                  <p className="text-sm text-ink-muted mt-1">Be the first to review {product.name}.</p>
                </div>
              ) : list.length === 0 ? (
                <p className="py-12 text-center text-sm text-ink-muted">No reviews match this filter yet.</p>
              ) : (
                <>
                  {list.slice(0, visible).map((rev, i) => <ReviewCard key={rev.id} rev={rev} index={i} />)}
                  {visible < list.length && (
                    <div className="pt-6 text-center">
                      <button
                        onClick={() => setVisible((v) => v + PAGE)}
                        className="px-7 py-2.5 rounded-brand border border-ink text-ink text-sm font-heading font-bold uppercase tracking-wide hover:bg-ink hover:text-surface transition-colors"
                      >
                        Load more reviews
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <div className="py-14 text-center">
            <p className="font-heading font-semibold text-ink">No questions yet</p>
            <p className="text-sm text-ink-muted mt-1">
              Have a question about {product.name}? <a href="/contact" className="underline underline-offset-4 text-ink">Contact us</a> and we'll answer it here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
