// server.js
require('dotenv').config();              
const express  = require('express');
const mongoose = require('mongoose');
const Product  = require('./models/Product');
const User     = require('./models/User');
const Order    = require('./models/Order');
const Review   = require('./models/Review');

const app = express();
app.use(express.json());

// connect to MongoDB (URI from .env or fallback)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// === Root health-check route ===
app.get('/', (req, res) => {
  res.json({
    message: 'E-commerce API is running!',
    endpoints: [
      'GET /add-product',
      'GET /add-user',
      'GET /add-order',
      'GET /add-review'
    ]
  });
});


// Add Product
app.get('/add-product', async (req, res) => {
  try {
    const p = await Product.create({
      product_id:       "P1001",
      product_name:     "Sample Phone",
      product_price:    699,
      product_category: "electronics",  
      product_stock:    100,
      provider_id:      "U2020",        
      product_images: [
        "https://example.com/img1.jpg",
        "https://example.com/img2.jpg"
      ]
    });
    res.status(201).json(p);
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
});

// Add User
app.get('/add-user', async (req, res) => {
  try {
    const u = await User.create({
      user_id:    "U2020",
      user_name:  "Alice",
      user_email: "alice@example.com",
      user_role:  "seller",
      user_address: { city: "Cape Town", country: "South Africa" }
    });
    res.status(201).json(u);
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
});

// Add Order
app.get('/add-order', async (req, res) => {
  try {
    const user    = await User.findOne({ user_id: "U2020" });
    const product = await Product.findOne({ product_id: "P1001" });
    const o = await Order.create({
      order_id:   "O3003",
      user_id:    user._id,                                  
      products: [{ product_id: product._id, quantity: 2 }],
      order_total: product.product_price * 2
    });
    res.status(201).json(o);
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
});

// Add Review
app.get('/add-review', async (req, res) => {
  try {
    const user    = await User.findOne({ user_id: "U2020" });
    const product = await Product.findOne({ product_id: "P1001" });
    const r = await Review.create({
      review_id:  "R4004",
      product_id: product._id,                               
      user_id:    user._id,                                   
      rating:     5,
      comment:    "Great phone!"
    });
    res.status(201).json(r);
  } catch(err) {
    res.status(400).json({ error: err.message });
  }np
});

// === Start server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
  console.log(`Server running on http://localhost:${PORT}`)
);
