const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create app instance
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests
//app.use(cors());
app.use(cors({
  origin: 'https://celescontainerwebapp-staging-b5g9ehgkhyb0dpe9.westus3-01.azurewebsites.net', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies/auth tokens
}));

// MongoDB Connection
const connectToDatabase = async () => {
  const mongoURI = process.env.USE_CLOUD_DB === 'true'
    ? process.env.AZURE_COSMOS_CONNECTIONSTRING // Cloud MongoDB URI
    : 'mongodb://127.0.0.1:27017/FinanceDB'; // Local MongoDB URI

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to ${process.env.USE_CLOUD_DB === 'true' ? 'Cloud' : 'Local'} MongoDB`);
  } catch (error) {
    console.error(`Error connecting to MongoDB (${mongoURI}):`, error);
    process.exit(1); // Exit if the database connection fails
  }
};

// Initialize database connection
connectToDatabase();

// Sample Mongoose Schema and Model
const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Item = mongoose.model('Item', ItemSchema);

// Routes
app.get('/', (req, res) => res.send('API is running...'));

// Get all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Create a new item
app.post('/items', async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }
    const newItem = new Item({ name, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'An unexpected error occurred' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
