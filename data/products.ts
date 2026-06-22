import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'h3',
    name: 'Aesthetic Blue Wall Collage Kit',
    category: 'wall-posters',
    description:
      'A beautifully curated set of 20+ prints featuring traditional Japanese architecture, ocean waves, cosmic starry skies, and inspiring typography in elegant shades of blue. Perfect for building a stunning, cohesive aesthetic collage on your bedroom or dorm wall.',
    price: 29.99,
    originalPrice: 59.99,
    discountPercent: 50,
    isHighlight: true,
    rating: 4.9,
    imageUrl: '',
    imageLocal: require('@/assets/products/blue-collage.jpg'),
    featured: true,
    trending: true,
    isNew: true,
    features: [
      '20+ premium aesthetic prints',
      'High-quality 4x6" cardstock',
      'Cohesive royal/navy blue theme',
      'Includes mounting adhesive',
    ],
  },
  {
    id: 'h1',
    name: "Spirited Away Collector's Edition Poster",
    category: 'wall-posters',
    description:
      'Premium framed poster featuring Chihiro from the beloved Studio Ghibli classic. Deep atmospheric tones and museum-quality print bring cinematic magic to your living space.',
    price: 24.99,
    originalPrice: 49.99,
    discountPercent: 50,
    isHighlight: true,
    rating: 4.9,
    imageUrl: '',
    imageLocal: require('@/assets/products/spirited-away-highlight.png'),
    featured: true,
    trending: true,
    isNew: true,
    features: [
      'Premium matte finish',
      '18" x 24" size',
      'Collector\'s edition artwork',
      'White frame ready to hang',
    ],
  },
  {
    id: 'h2',
    name: 'Moonlight Mischief Typography Poster',
    category: 'wall-posters',
    description:
      'Edgy minimalist poster with "Moonlight. Mischief. Midnight." typography and a glowing moon skull illustration. A bold statement piece for modern interiors.',
    price: 19.99,
    originalPrice: 39.99,
    discountPercent: 50,
    isHighlight: true,
    rating: 4.8,
    imageUrl: '',
    imageLocal: require('@/assets/products/moonlight-mischief-highlight.png'),
    featured: true,
    trending: true,
    isNew: true,
    features: [
      'Museum-grade print',
      '12" x 16" with white mat',
      'Slim black frame included',
      'Fade-resistant inks',
    ],
  },
  {
    id: '1',
    name: 'Midnight Blue Abstract Poster',
    category: 'wall-posters',
    description:
      'A stunning abstract poster featuring deep navy tones and gold accents. Perfect for creating a sophisticated focal point in any room.',
    price: 24.99,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80',
    featured: true,
    trending: true,
    isNew: false,
    features: ['Premium matte finish', '24" x 36" size', 'Fade-resistant inks', 'Easy to frame'],
  },
  {
    id: '2',
    name: 'Botanical Garden Canvas',
    category: 'canvas-paintings',
    description:
      'Hand-stretched canvas featuring lush botanical illustrations. Brings nature indoors with elegant watercolor aesthetics.',
    price: 89.99,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80',
    featured: true,
    trending: true,
    isNew: true,
    features: ['Gallery-wrapped canvas', 'Ready to hang', 'UV-resistant coating', '24" x 30"'],
  },
  {
    id: '3',
    name: 'Bohemian Feather Dreamcatcher',
    category: 'dreamcatchers',
    description:
      'Handwoven dreamcatcher with natural feathers and crystal beads. Creates a serene, bohemian atmosphere in bedrooms and reading nooks.',
    price: 34.99,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80',
    featured: true,
    trending: false,
    isNew: false,
    features: ['Handcrafted', 'Natural materials', '12" diameter', 'Includes hanging loop'],
  },
  {
    id: '4',
    name: 'Macramé Wall Hanging',
    category: 'wall-hangings',
    description:
      'Intricately knotted macramé wall art in cream cotton cord. Adds texture and warmth to minimalist spaces.',
    price: 45.99,
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
    featured: false,
    trending: true,
    isNew: true,
    features: ['100% cotton cord', 'Hand-knotted', '36" length', 'Wooden dowel included'],
  },
  {
    id: '5',
    name: 'Coastal Memories Souvenir Box',
    category: 'souvenirs',
    description:
      'Elegant keepsake box with coastal-inspired design. Perfect for storing treasured mementos and travel memories.',
    price: 29.99,
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80',
    featured: false,
    trending: false,
    isNew: true,
    features: ['Velvet-lined interior', 'Magnetic closure', 'Gift-ready packaging', '5" x 7"'],
  },
  {
    id: '6',
    name: 'Gold Geometric Vase Set',
    category: 'decorative-accessories',
    description:
      'Set of three minimalist geometric vases with gold accents. Ideal for dried flowers or standalone display.',
    price: 39.99,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1580064141068-f42c18d153f5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    featured: true,
    trending: true,
    isNew: false,
    features: ['Ceramic construction', 'Set of 3 sizes', 'Gold leaf detail', 'Hand-painted'],
  },
  {
    id: '7',
    name: 'Vintage Film Poster Collection',
    category: 'wall-posters',
    description:
      'Curated set of three vintage-inspired film posters. Nostalgic charm meets modern printing quality.',
    price: 49.99,
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    featured: false,
    trending: true,
    isNew: false,
    features: ['Set of 3 posters', '18" x 24" each', 'Archival paper', 'Matte finish'],
  },
  {
    id: '8',
    name: 'Sunset Horizon Canvas Triptych',
    category: 'canvas-paintings',
    description:
      'Three-panel canvas set depicting a serene sunset over calm waters. Creates a panoramic masterpiece for living rooms.',
    price: 129.99,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80',
    featured: true,
    trending: false,
    isNew: true,
    features: ['Triptych set', 'Gallery depth 1.5"', 'Pre-installed hooks', 'Total 60" wide'],
  },
  {
    id: '9',
    name: 'Moon Phase Dreamcatcher',
    category: 'dreamcatchers',
    description:
      'Crescent moon-shaped dreamcatcher with silver thread and pearl accents. A celestial touch for dreamy bedrooms.',
    price: 42.99,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1543599843-c675c622a678?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    featured: true,
    trending: true,
    isNew: false,
    features: ['Moon crescent frame', 'Pearl accents', 'LED optional variant', '14" width'],
  },
  {
    id: '10',
    name: 'Woven Tapestry Wall Art',
    category: 'wall-hangings',
    description:
      'Large-scale woven tapestry featuring geometric patterns in navy and gold. Statement piece for accent walls.',
    price: 79.99,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80',
    featured: false,
    trending: true,
    isNew: false,
    features: ['Cotton blend weave', '48" x 60"', 'Wooden rod included', 'Machine washable'],
  },
  {
    id: '11',
    name: 'Artisan Ceramic Keepsake',
    category: 'souvenirs',
    description:
      'Hand-thrown ceramic piece with unique glaze patterns. Each piece is one-of-a-kind, signed by the artisan.',
    price: 54.99,
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80',
    featured: false,
    trending: false,
    isNew: true,
    features: ['Hand-thrown ceramic', 'Unique glaze', 'Signed by artist', '4" height'],
  },
  {
    id: '12',
    name: 'Crystal Candle Holder Duo',
    category: 'decorative-accessories',
    description:
      'Pair of elegant crystal candle holders that cast beautiful light patterns. Perfect for ambient evening décor.',
    price: 32.99,
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1602874805490-065a3f4a6028?w=600&q=80',
    featured: false,
    trending: false,
    isNew: false,
    features: ['Lead-free crystal', 'Set of 2', 'Fits taper candles', 'Gift boxed'],
  },
  {
    id: '13',
    name: 'Minimalist Line Art Poster',
    category: 'wall-posters',
    description:
      'Clean line art poster featuring a serene face silhouette. Scandinavian-inspired design for modern interiors.',
    price: 19.99,
    rating: 4.3,
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80',
    featured: false,
    trending: false,
    isNew: true,
    features: ['Minimalist design', '12" x 16"', 'Heavyweight paper', 'Unframed'],
  },
  {
    id: '14',
    name: 'Impressionist Garden Canvas',
    category: 'canvas-paintings',
    description:
      'Soft impressionist-style canvas depicting a blooming garden path. Soft pastels create a calming atmosphere.',
    price: 74.99,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1775308493877-dcf33d99535f?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    featured: false,
    trending: true,
    isNew: false,
    features: ['Stretched canvas', '20" x 24"', 'Fade-resistant', 'Ready to hang'],
  },
  {
    id: '15',
    name: 'Rainbow Crystal Dreamcatcher',
    category: 'dreamcatchers',
    description:
      'Vibrant dreamcatcher with rainbow-colored threads and crystal droplets. Catches light beautifully near windows.',
    price: 38.99,
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80',
    featured: false,
    trending: true,
    isNew: true,
    features: ['Crystal droplets', 'Rainbow threads', '10" diameter', 'Lightweight'],
  },
  {
    id: '16',
    name: 'Fringe Boho Wall Hanging',
    category: 'wall-hangings',
    description:
      'Layered fringe wall hanging in neutral tones with subtle gold threading. Adds bohemian elegance to any wall.',
    price: 55.99,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1558603668-6570496b66f8?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    featured: true,
    trending: false,
    isNew: false,
    features: ['Layered fringe design', 'Gold thread accents', '42" length', 'Easy installation'],
  },
  {
    id: '17',
    name: 'Travel Journal Souvenir Set',
    category: 'souvenirs',
    description:
      'Beautiful journal and pen set with map-inspired cover design. Document your adventures in style.',
    price: 22.99,
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80',
    featured: false,
    trending: false,
    isNew: false,
    features: ['200 lined pages', 'Elastic closure', 'Matching pen included', 'A5 size'],
  },
  {
    id: '18',
    name: 'Marble & Gold Bookends',
    category: 'decorative-accessories',
    description:
      'Luxurious marble bookends with gold geometric bases. Functional art for shelves and desks.',
    price: 64.99,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80',
    featured: true,
    trending: true,
    isNew: true,
    features: ['Genuine marble', 'Gold-plated base', 'Set of 2', 'Non-slip pads'],
  },
  {
    id: '19',
    name: 'Celestial Map Poster',
    category: 'wall-posters',
    description:
      'Detailed star map poster showing constellations visible from the Northern Hemisphere. Perfect for astronomy lovers.',
    price: 27.99,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80',
    featured: true,
    trending: false,
    isNew: false,
    features: ['Glow-in-dark stars', '24" x 36"', 'Educational labels', 'Premium print'],
  },
  {
    id: '20',
    name: 'Ocean Waves Canvas',
    category: 'canvas-paintings',
    description:
      'Dynamic ocean wave canvas with textured brushstrokes. Captures the power and beauty of the sea.',
    price: 94.99,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1542321882-d8cc271b7e84?q=80&w=2722&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    featured: false,
    trending: true,
    isNew: false,
    features: ['Textured finish', '30" x 40"', 'Deep gallery wrap', 'Coastal vibes'],
  },
  {
    id: '21',
    name: 'Mini Dreamcatcher Set',
    category: 'dreamcatchers',
    description:
      'Set of three mini dreamcatchers in complementary colors. Perfect for car mirrors, windows, or gift sets.',
    price: 24.99,
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80',
    featured: false,
    trending: false,
    isNew: true,
    features: ['Set of 3', '4" each', 'Assorted colors', 'Gift packaging'],
  },
  {
    id: '22',
    name: 'Pampas Grass Wall Arrangement',
    category: 'wall-hangings',
    description:
      'Preserved pampas grass arrangement in a minimalist wall mount. Brings organic texture without maintenance.',
    price: 48.99,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
    featured: false,
    trending: false,
    isNew: true,
    features: ['Preserved pampas', 'No watering needed', 'Wall mount included', '18" arrangement'],
  },
  {
    id: '23',
    name: 'Scented Soy Candle Trio',
    category: 'decorative-accessories',
    description:
      'Hand-poured soy candles in lavender, vanilla, and sandalwood scents. Eco-friendly and long-burning.',
    price: 36.99,
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80',
    featured: false,
    trending: true,
    isNew: false,
    features: ['100% soy wax', '40hr burn each', 'Cotton wicks', 'Reusable jars'],
  },
  {
    id: '24',
    name: 'Globe Souvenir Paperweight',
    category: 'souvenirs',
    description:
      'Crystal-clear glass paperweight with embedded vintage map globe. A timeless desk accessory and conversation starter.',
    price: 31.99,
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1572048572872-2394404cf1f3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    featured: false,
    trending: false,
    isNew: false,
    features: ['Solid glass', '3" diameter', 'Vintage map detail', 'Desk accessory'],
  },
];

export const getProductById = (id: string) =>
  products.find((p) => p.id === id);

export const getFeaturedProducts = () =>
  products.filter((p) => p.featured);

export const getHighlightProducts = () =>
  products.filter((p) => p.isHighlight);

export const getTrendingProducts = () =>
  products.filter((p) => p.trending);

export const getNewArrivals = () =>
  products.filter((p) => p.isNew);

export const getProductsByCategory = (categoryId: string) =>
  products.filter((p) => p.category === categoryId);

export const searchProducts = (query: string) => {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.replace(/-/g, ' ').includes(q)
  );
};

export const sortProducts = (
  items: Product[],
  sort: 'default' | 'price-low' | 'price-high' | 'rating'
) => {
  const sorted = [...items];
  switch (sort) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
};
