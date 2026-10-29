
export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  label?: string;
};

export const products: Product[] = [
  {
    id: "signature-bonbon-box",
    name: "The Signature Bonbon Box",
    category: "Chocolate",
    price: 28500,
    image:
      "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=900",
    description:
      "A carefully selected assortment of indulgent chocolates, beautifully presented for gifting or sharing.",
    label: "Bestseller",
  },
  {
    id: "chocolate-truffles",
    name: "Handcrafted Chocolate Truffles",
    category: "Chocolate",
    price: 18000,
    image:
      "https://images.pexels.com/photos/4110101/pexels-photo-4110101.jpeg?auto=compress&cs=tinysrgb&w=900",
    description:
      "Rich chocolate treats made for slow, satisfying moments and thoughtful gifts.",
    label: "Customer favourite",
  },
  {
    id: "celebration-cake",
    name: "Celebration Chocolate Cake",
    category: "Cakes",
    price: 35000,
    image:
      "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=900",
    description:
      "A celebration-ready chocolate cake for birthdays, milestones, and special occasions.",
    label: "Made to order",
  },
  {
    id: "little-treat-box",
    name: "The Little Treat Box",
    category: "Gifts",
    price: 15500,
    image:
      "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=900",
    description:
      "A lovely little selection when you want to make someone's day sweeter.",
  },
  {
    id: "chocolate-cake-slices",
    name: "Chocolate Cake Slices",
    category: "Cakes",
    price: 12000,
    image:
      "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=900",
    description:
      "Chocolate cake slices for sharing at home or enjoying as an everyday treat.",
  },
  {
    id: "sweet-gift-selection",
    name: "The Sweet Gift Selection",
    category: "Gifts",
    price: 24000,
    image:
      "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=900",
    description:
      "A thoughtful gift selection for celebrations, thank-you gestures, and surprises.",
  },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}
