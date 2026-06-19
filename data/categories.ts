import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'wall-posters',
    name: 'Wall Posters',
    icon: 'image-outline',
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&q=80',
  },
  {
    id: 'canvas-paintings',
    name: 'Canvas Paintings',
    icon: 'color-palette-outline',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80',
  },
  {
    id: 'dreamcatchers',
    name: 'Dreamcatchers',
    icon: 'moon-outline',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80',
  },
  {
    id: 'wall-hangings',
    name: 'Wall Hangings',
    icon: 'leaf-outline',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80',
  },
  {
    id: 'souvenirs',
    name: 'Souvenirs',
    icon: 'gift-outline',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80',
  },
  {
    id: 'decorative-accessories',
    name: 'Decorative Accessories',
    icon: 'sparkles-outline',
    imageUrl: 'https://images.unsplash.com/photo-1752123186426-0876a37f27df?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3DNPX ',
  },
];

export const getCategoryById = (id: string) =>
  categories.find((c) => c.id === id);

export const getCategoryName = (id: string) =>
  getCategoryById(id)?.name ?? id;
