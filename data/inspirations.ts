export interface ProductTag {
  productId: string;
  x: number; // percentage from left (0 to 100)
  y: number; // percentage from top (0 to 100)
}

export interface Inspiration {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: ProductTag[];
}

export const inspirations: Inspiration[] = [
  {
    id: 'i1',
    title: 'Minimalist Living Room Cozy Set',
    description: 'A serene living room blending natural cotton textures with sophisticated gold leaf accents.',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    tags: [
      { productId: '1', x: 45, y: 30 },
      { productId: '4', x: 25, y: 20 },
      { productId: '6', x: 70, y: 65 },
    ],
  },
  {
    id: 'i2',
    title: 'Dark Academia Study Corner',
    description: 'An inspiring corner for readers, surrounded by deep mahogany bookends and glowing ambient lighting.',
    imageUrl: 'https://images.unsplash.com/photo-1543599843-c675c622a678?q=80&w=800&auto=format&fit=crop',
    tags: [
      { productId: 'h1', x: 40, y: 35 },
      { productId: '18', x: 55, y: 68 },
      { productId: '12', x: 75, y: 72 },
    ],
  },
  {
    id: 'i3',
    title: 'Bohemian Bedroom Oasis',
    description: 'Escape into a dreamy sanctuary styled with woven feather hangers and preserved botanical grass.',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    tags: [
      { productId: '3', x: 50, y: 20 },
      { productId: '22', x: 80, y: 35 },
    ],
  },
];

export const getInspirationById = (id: string) =>
  inspirations.find((i) => i.id === id);
