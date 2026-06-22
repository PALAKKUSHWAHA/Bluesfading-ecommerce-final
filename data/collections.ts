export interface Collection {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  productIds: string[];
}

export const collections: Collection[] = [
  {
    id: 'minimalist',
    name: 'Minimalist Living',
    description: 'Clean lines, neutral tones, and functional beauty for the modern home.',
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80',
    productIds: ['h2', '1', '6', '12', '13', '18'],
  },
  {
    id: 'dark-academia',
    name: 'Dark Academia',
    description: 'Rich dark woods, classic art, and vintage scholarly charm.',
    imageUrl: 'https://images.unsplash.com/photo-1543599843-c675c622a678?q=80&w=600&auto=format&fit=crop',
    productIds: ['h1', '18', '19', '24'],
  },
  {
    id: 'cottagecore',
    name: 'Cottagecore',
    description: 'Whimsical botanicals, hand-woven pieces, and cozy rural aesthetics.',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80',
    productIds: ['2', '3', '4', '16', '22'],
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian',
    description: 'Bright spaces, warm textiles, and simple geometric accents.',
    imageUrl: 'https://images.unsplash.com/photo-1580064141068-f42c18d153f5?w=600&q=80',
    productIds: ['6', '12', '13', '18'],
  },
  {
    id: 'boho-chic',
    name: 'Boho Chic',
    description: 'Free-spirited designs, natural macramé, and colorful textures.',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80',
    productIds: ['3', '4', '9', '10', '15', '16', '22'],
  },
  {
    id: 'japanese-zen',
    name: 'Japanese Zen',
    description: 'Tranquil ceramic crafts, structured patterns, and minimalist harmony.',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80',
    productIds: ['6', '10', '11', '23'],
  },
  {
    id: 'vintage-elegance',
    name: 'Vintage Elegance',
    description: 'Timeless keepsake items, antique mapping prints, and velvet luxuries.',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80',
    productIds: ['5', '7', '11', '17', '18', '24'],
  },
];

export const getCollectionById = (id: string) =>
  collections.find((c) => c.id === id);
