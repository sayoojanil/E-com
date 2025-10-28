// Product catalog for the toy shop
// Each product: id, name, price, category, rating (0-5), image, description

const PRODUCTS = [
  {
    id: 'car-speedster',
    name: 'Speedster Car',
    price: 19.99,
    category: 'Cars',
    rating: 4.5,
    image: 'https://isakaabengaluru.s3.ap-south-1.amazonaws.com/wp-content/uploads/2022/04/29125018/71dEWXwH0cL._SL1500_-247x247.jpg',
    description: 'Zoom into fun with this colorful pull-back speedster car! Durable and perfect for little racers.'
  },
  {
    id: 'car-monster',
    name: 'Monster Truck',
    price: 24.99,
    category: 'Cars',
    rating: 4.2,
    image: 'https://m.media-amazon.com/images/I/61AqSeExXAL.jpg',
    description: 'Big wheels, big fun. This monster truck conquers every carpet mountain.'
  },
  {
    id: 'doll-rainbow',
    name: 'Rainbow Doll',
    price: 29.99,
    category: 'Dolls',
    rating: 4.8,
    image: 'https://images-cdn.ubuy.co.in/633b4c355e15d131c8151e45-cheerwing-u12s-mini-rc-helicopter-with.jpg',
    description: 'A friendly doll with rainbow outfits and endless stories to tell.'
  },
  {
    id: 'doll-buddy',
    name: 'Buddy Bear Doll',
    price: 14.99,
    category: 'Plushies',
    rating: 4.4,
    image: 'https://m.media-amazon.com/images/I/71K4P2HEo6L._AC_UF1000,1000_QL80_.jpg',
    description: 'Super soft and cuddly plush bear. Perfect for naps and hugs.'
  },
  // {
  //   id: 'edu-blocks',
  //   name: 'Smart Blocks 100pcs',
  //   price: 34.99,
  //   category: 'Educational',
  //   rating: 4.7,
  //   image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200&auto=format&fit=crop',
  //   description: 'Build, count, and learn colors with 100 durable interlocking blocks.'
  // },
  // {
  //   id: 'edu-puzzle',
  //   name: 'Animal Puzzle Set',
  //   price: 16.99,
  //   category: 'Educational',
  //   rating: 4.3,
  //   image: 'https://images.unsplash.com/photo-1610216705606-1f0f3f2f6c64?q=80&w=1200&auto=format&fit=crop',
  //   description: 'Wooden animal puzzles that boost problem solving and fine motor skills.'
  // },
  // {
  //   id: 'plush-unicorn',
  //   name: 'Unicorn Plush',
  //   price: 21.99,
  //   category: 'Plushies',
  //   rating: 4.9,
  //   image: 'https://images.unsplash.com/photo-1617957743103-d9442af9e711?q=80&w=1200&auto=format&fit=crop',
  //   description: 'Magically soft unicorn with sparkly horn and pastel mane.'
  // },
  // {
  //   id: 'car-train',
  //   name: 'Mini Train Set',
  //   price: 27.5,
  //   category: 'Educational',
  //   rating: 4.6,
  //   image: 'https://images.unsplash.com/photo-1484820540004-14229fe36ca4?q=80&w=1200&auto=format&fit=crop',
  //   description: 'Snap-together tracks with a friendly train engine that encourages imaginative play.'
  // },
  // {
  //   id: 'plush-dino',
  //   name: 'Dino Plush',
  //   price: 18.0,
  //   category: 'Plushies',
  //   rating: 4.1,
  //   image: 'https://images.unsplash.com/photo-1609828834651-5873f9f5a21d?q=80&w=1200&auto=format&fit=crop',
  //   description: 'Roar-some cuddles with this adorable dinosaur friend.'
  // },
  // {
  //   id: 'doll-princess',
  //   name: 'Princess Doll',
  //   price: 26.49,
  //   category: 'Dolls',
  //   rating: 4.5,
  //   image: 'https://images.unsplash.com/photo-1585386959984-a415522316dc?q=80&w=1200&auto=format&fit=crop',
  //   description: 'Sparkly dress, bright smile, and stories from a magical kingdom.'
  // }
];

function getProductById(productId) {
  return PRODUCTS.find(p => p.id === productId) || null;
}

function getRelatedProducts(productId, limit = 4) {
  const product = getProductById(productId);
  if (!product) return PRODUCTS.slice(0, limit);
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id);
  if (related.length >= limit) return related.slice(0, limit);
  const others = PRODUCTS.filter(p => p.id !== product.id);
  return [...related, ...others].slice(0, limit);
}

// Expose to global
window.PRODUCTS = PRODUCTS;
window.getProductById = getProductById;
window.getRelatedProducts = getRelatedProducts;


