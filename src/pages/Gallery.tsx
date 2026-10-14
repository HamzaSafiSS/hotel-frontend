import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  ChevronRight,
  ZoomIn,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { ContentContainer } from '../components/ui/ContentContainer';
import { Button } from '../components/ui/Button';

interface GalleryImage {
  id: string;
  title: string;
  category: 'rooms' | 'dining' | 'facilities' | 'experiences' | 'property';
  categoryLabel: string;
  caption: string;
  imageUrl: string;
  altText: string;
}

const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Photos' },
  { id: 'rooms', label: 'Rooms & Suites' },
  { id: 'dining', label: 'Dining' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'property', label: 'Property & Surroundings' },
];

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'gal-1',
    title: 'Ocean View Suite Master Quarters',
    category: 'rooms',
    categoryLabel: 'Rooms & Suites',
    caption: 'Expansive king bed with panoramic horizon windows and bespoke Egyptian linens.',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
    altText: 'Sunlit luxury suite master bedroom with king bed and ocean vistas',
  },
  {
    id: 'gal-2',
    title: 'Infinity Pool at Sunset',
    category: 'facilities',
    categoryLabel: 'Facilities',
    caption: 'Temperature-controlled infinity pool reflecting golden sunset skies over the sea.',
    imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=80',
    altText: 'Resort infinity pool overlooking coastal sunset horizon',
  },
  {
    id: 'gal-3',
    title: 'Seaside Pavilion Artisanal Dining',
    category: 'dining',
    categoryLabel: 'Dining',
    caption: 'Fresh coastal catch paired with fine vintage wines on our open-air dining terrace.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    altText: 'Elegantly set dinner table overlooking coastal ocean breezes',
  },
  {
    id: 'gal-4',
    title: 'Private Pool Villa Sun Deck',
    category: 'rooms',
    categoryLabel: 'Rooms & Suites',
    caption: 'Secluded tropical garden courtyard with a private plunge pool and cushioned cabanas.',
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80',
    altText: 'Private villa plunge pool bordered by tropical flora and teak sun deck',
  },
  {
    id: 'gal-5',
    title: 'Sunset Coastal Cliffside Horizons',
    category: 'property',
    categoryLabel: 'Property & Surroundings',
    caption: 'Aerial panorama of the tranquil coastal headlands framing Skyview resort grounds.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    altText: 'Scenic coastline with turquoise ocean waves and pristine sandy shores',
  },
  {
    id: 'gal-6',
    title: 'Botanical Wellness & Spa Pavilion',
    category: 'facilities',
    categoryLabel: 'Facilities',
    caption: 'Holistic massage suites equipped with essential oils and restorative sound therapy.',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80',
    altText: 'Serene spa treatment suite with aromatherapy setup and soft illumination',
  },
  {
    id: 'gal-7',
    title: 'Chef Curated Seafood Creation',
    category: 'dining',
    categoryLabel: 'Dining',
    caption: 'Freshly prepared Atlantic salmon with saffron asparagus and reduction glaze.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80',
    altText: 'Gourmet grilled seafood dish presented with microgreens',
  },
  {
    id: 'gal-8',
    title: 'Coastal Sunset Sailing Excursion',
    category: 'experiences',
    categoryLabel: 'Experiences',
    caption: 'Private catamaran charter along the Azure Haven coast during golden hour.',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    altText: 'Sailboat gliding through golden sunset waters along scenic headlands',
  },
  {
    id: 'gal-9',
    title: 'Deluxe Suite Marble Bath & Spa Tub',
    category: 'rooms',
    categoryLabel: 'Rooms & Suites',
    caption: 'Freestanding deep-soaking bathtub with designer brass fixtures and botanical bath salts.',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
    altText: 'Marble hotel bathroom with modern deep soaking tub and rain shower',
  },
  {
    id: 'gal-10',
    title: 'Panoramic Fitness Center',
    category: 'facilities',
    categoryLabel: 'Facilities',
    caption: 'State-of-the-art cardio and weight training studio overlooking the ocean cliffs.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
    altText: 'Modern hotel gym with treadmills and weight stations with sea views',
  },
  {
    id: 'gal-11',
    title: 'Sunrise Beachside Yoga & Meditation',
    category: 'experiences',
    categoryLabel: 'Experiences',
    caption: 'Guided morning mindfulness sessions on the tranquil seaside deck.',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80',
    altText: 'Yoga practitioner in peaceful meditation overlooking coastal waters at dawn',
  },
  {
    id: 'gal-12',
    title: 'Resort Architecture & Manicured Gardens',
    category: 'property',
    categoryLabel: 'Property & Surroundings',
    caption: 'Modern coastal facades draped in indigenous flora and ambient evening illumination.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
    altText: 'Luxury resort building with palm trees, landscaped courtyard, and ambient lighting',
  },
];

import { useHotelStore } from '../store/hotelStore';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxImage, setActiveLightboxImage] = useState<GalleryImage | null>(null);
  const { gallery } = useHotelStore();

  const publishedImages = useMemo(() => {
    const list = gallery.filter((g) => g.published);
    return list.length > 0 ? (list as any as GalleryImage[]) : GALLERY_IMAGES;
  }, [gallery]);

  // Filter images based on selected category
  const filteredImages = useMemo(() => {
    if (selectedCategory === 'all') return publishedImages;
    return publishedImages.filter((img) => img.category === selectedCategory);
  }, [selectedCategory, publishedImages]);

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeLightboxImage) {
        setActiveLightboxImage(null);
      }
    };

    if (activeLightboxImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeLightboxImage]);

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#062B45] text-white py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=80"
            alt="Skyview Resort Architecture & Visual Showcase"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#041D2F]/90 via-[#062B45]/65 to-[#041D2F]/40" />
        </div>

        <ContentContainer size="7xl" className="relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-300 mb-6">
            <Link to="/" className="hover:text-[#DFCA9B] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C7A66B]" />
            <span className="text-white font-medium">Gallery</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] mb-3">
              VISUAL INSPIRATION
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight mb-6 leading-tight">
              A Photographic Journey Through Skyview
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed mb-8">
              Explore the architectural beauty, ocean-facing suites, culinary artistry, and restorative spaces that define our sanctuary.
            </p>
            <div className="flex items-center gap-4">
              <Button
                to="/booking"
                variant="gold"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Book Your Stay
              </Button>
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* 2. CATEGORY FILTER BAR */}
      <section className="sticky top-16 sm:top-20 z-20 bg-white/95 backdrop-blur-md border-b border-[#D8E0EA] py-4 shadow-xs">
        <ContentContainer size="7xl">
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <div className="flex items-center gap-2">
              <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#60758B] mr-2">
                <Filter className="w-3.5 h-3.5 text-[#C7A66B]" />
                <span>Categories:</span>
              </span>

              {GALLERY_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B] ${
                      isActive
                        ? 'bg-[#062B45] text-white shadow-xs'
                        : 'bg-gray-100 hover:bg-[#EAF2FF] text-[#18324A]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <span className="text-xs text-[#60758B] shrink-0 hidden lg:inline-block">
              Showing {filteredImages.length} photographs
            </span>
          </div>
        </ContentContainer>
      </section>

      {/* 3. IMAGE GRID */}
      <section className="py-12 sm:py-20 bg-[#EAF2FF]/20 flex-1">
        <ContentContainer size="7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                onClick={() => setActiveLightboxImage(image)}
                className="group bg-white rounded-2xl border border-[#D8E0EA] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between focus-within:ring-2 focus-within:ring-[#C7A66B]"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveLightboxImage(image);
                  }
                }}
                aria-label={`View enlarged photograph: ${image.title}`}
              >
                {/* Photo Frame */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
                  <img
                    src={image.imageUrl}
                    alt={image.altText}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-[#062B45] px-2.5 py-1 rounded-md shadow-2xs">
                      {image.categoryLabel}
                    </span>
                  </div>

                  {/* Hover Hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-[#062B45] text-xs font-semibold shadow-md">
                      <ZoomIn className="w-3.5 h-3.5 text-[#C7A66B]" />
                      <span>Enlarge View</span>
                    </span>
                  </div>
                </div>

                {/* Caption Bar */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#062B45] group-hover:text-[#C7A66B] transition-colors mb-1">
                      {image.title}
                    </h3>
                    <p className="text-xs text-[#60758B] leading-relaxed line-clamp-2">
                      {image.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContentContainer>
      </section>

      {/* 4. LIGHTBOX MODAL */}
      {activeLightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-image-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#041D2F]/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveLightboxImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#D8E0EA] flex flex-col relative animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveLightboxImage(null)}
              aria-label="Close photo preview"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Enlarged Photo */}
            <div className="relative w-full max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeLightboxImage.imageUrl}
                alt={activeLightboxImage.altText}
                className="w-full h-full object-contain max-h-[70vh]"
              />
            </div>

            {/* Modal Footer Caption */}
            <div className="p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#D8E0EA]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C7A66B] block mb-1">
                  {activeLightboxImage.categoryLabel}
                </span>
                <h3 id="lightbox-image-title" className="font-serif text-xl sm:text-2xl font-normal text-[#062B45]">
                  {activeLightboxImage.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#60758B] mt-1 leading-relaxed">
                  {activeLightboxImage.caption}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveLightboxImage(null)}
                className="shrink-0 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#062B45] text-xs font-semibold transition-colors cursor-pointer"
              >
                Return to Gallery (ESC)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
