import { Review } from '@/types';

export const mockReviews: Record<string, Review[]> = {
  h1: [
    {
      id: 'r1',
      userName: 'Aarav Mehta',
      rating: 5,
      comment: 'Absolutely stunning poster! The print quality is top notch and the white frame looks premium. Perfect addition to my studio room.',
      date: '12 May 2026',
    },
    {
      id: 'r2',
      userName: 'Priya Sharma',
      rating: 4.8,
      comment: 'Very nice colors. Captures the mood of Spirited Away beautifully. Deducted 0.2 because the shipping took 4 days, but otherwise flawless.',
      date: '02 June 2026',
    },
  ],
  h2: [
    {
      id: 'r3',
      userName: 'Rohan Gupta',
      rating: 5,
      comment: 'Extremely edgy and clean typography! The moon skull looks epic in my bedroom. Build quality is solid.',
      date: '28 May 2026',
    },
    {
      id: 'r4',
      userName: 'Sneha Patel',
      rating: 4.5,
      comment: 'Nice matte finish, does not reflect light. Standard black frame is thin and elegant. Recommended.',
      date: '15 June 2026',
    },
  ],
  '1': [
    {
      id: 'r5',
      userName: 'Vikram Singh',
      rating: 5,
      comment: 'The gold accents really shine in natural light! Looks very sophisticated in the living area.',
      date: '20 June 2026',
    },
  ],
  '2': [
    {
      id: 'r6',
      userName: 'Anjali Desai',
      rating: 4.9,
      comment: 'High quality canvas print. Ready to hang out of the box. Colors are exactly as pictured.',
      date: '18 June 2026',
    },
  ],
};

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rd1',
    userName: 'Karan Malhotra',
    rating: 4.5,
    comment: 'Really sets a modern vibe in my apartment. Premium look and feel, absolutely love it.',
    date: '10 June 2026',
  },
  {
    id: 'rd2',
    userName: 'Divya Nair',
    rating: 4.7,
    comment: 'Super fast delivery and packaging was extremely secure. The material quality feels premium.',
    date: '14 June 2026',
  },
];

export function getReviewsByProductId(productId: string): Review[] {
  return mockReviews[productId] || DEFAULT_REVIEWS;
}

export function getRatingStats(reviews: Review[]) {
  const total = reviews.length;
  if (total === 0) {
    return {
      average: 5,
      count: 0,
      distribution: [0, 0, 0, 0, 0],
    };
  }

  let sum = 0;
  const distribution = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1 stars

  reviews.forEach((r) => {
    sum += r.rating;
    const roundedRating = Math.round(r.rating);
    if (roundedRating >= 1 && roundedRating <= 5) {
      distribution[5 - roundedRating]++;
    }
  });

  return {
    average: parseFloat((sum / total).toFixed(1)),
    count: total,
    distribution: distribution.map((count) => Math.round((count / total) * 100)),
  };
}
