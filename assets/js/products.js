// Product catalog for the toy shop
// Each product: id, name, price, category, rating (0-5), image, description

const PRODUCTS = [               //all toy datas
  {
    id: 'car-speedster',
    name: 'Speedster Car',
    price: 19.99,
    category: 'Cars',
    rating: 4.5,
    image: 'https://mirana-stage-commerce-v2-storage.miranatech.com/thumbnails/products/Silver_201be8d0_thumbnail_1024.jpg',
    description: 'Zoom into fun with this colorful pull-back speedster car! Durable and perfect for little racers.'
  },
  {
    id: 'car-monster',
    name: 'Monster Truck',
    price: 24.99,
    category: 'Cars',
    rating: 4.2,
    image: 'https://cdn.shopify.com/s/files/1/0263/8469/5395/files/mt-one-truck-blue-main1_db72b343-b62d-4cd4-91dc-cbaf13b7942a_1_x280.jpg',
    description: 'Big wheels, big fun. This monster truck conquers every carpet mountain.'
  },
  {
    id: 'Rc helicopter',
    name: 'Rc helicopter',
    price: 29.99,
    category: 'Helicopter',
    rating: 4.8,
    image:'https://s.alicdn.com/@sc04/kf/H071eb1d5059141d1b691e36f7943eeedu.jpg',
    description: 'A friendly doll with rainbow outfits and endless stories to tell.'
  },
  {
    id: 'Drift Car',
    name: 'Drift Car',
    price: 14.99,
    category: 'cars',
    rating: 4.4,
    image: 'https://rccarworld.com/wp-content/uploads/2023/12/rcdriftcar.jpg',
    description: 'Super soft and cuddly plush bear. Perfect for naps and hugs.'
  },
  
];


//fucntion for getting product by id

function getProductById(productId) {    //fetch a single product by id
  return PRODUCTS.find(p => p.id === productId) || null;
}

//function for getting related products

function getRelatedProducts(productId, limit = 4) {                     //suggest related toys
  const product = getProductById(productId);
  if (!product) return PRODUCTS.slice(0, limit);
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id);
  if (related.length >= limit) return related.slice(0, limit);
  const others = PRODUCTS.filter(p => p.id !== product.id);
  return [...related, ...others].slice(0, limit);
}

// Expose to global for using in other files(codes)
window.PRODUCTS = PRODUCTS;                                       //Makes them usable in other codes
window.getProductById = getProductById;
window.getRelatedProducts = getRelatedProducts;


