const products = Array.from({ length: 3000 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: parseFloat((Math.random() * 100 + 5).toFixed(2)),
  }));
  
  module.exports = products;
  