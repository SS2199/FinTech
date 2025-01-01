const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // Import the CORS package

const app = express();
const port = process.env.PORT || 5000;

// Azure Cosmos DB connection string
const mongoURI = "mongodb://celescontainerwebapp-server:Cd8bsmtPGb944jUTWSF6f03i9ZyuoYpKSNd14ZX7rrL5hM9yzcdZF6WidOZABiakigan29ihvSGtACDbgtLJdg==@celescontainerwebapp-server.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@celescontainerwebapp-server@";

// Middleware for parsing JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use CORS middleware to enable cross-origin requests
app.use(cors({
  origin: 'https://celescontainerwebapp-staging-b5g9ehgkhyb0dpe9.westus3-01.azurewebsites.net',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Explicitly handle the OPTIONS preflight requests
app.options('*', cors());

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Define Item Schema and Model
const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});
const ItemModel = mongoose.model('Item', ItemSchema);

// Routes

// GET /items - Fetch all items
app.get('/items', async (req, res) => {
  try {
    const items = await ItemModel.find(); // Fetch all items
    res.json({ success: true, items }); // Send items as JSON
  } catch (err) {
    console.error('Error retrieving items:', err);
    res.status(500).json({ success: false, message: 'Error retrieving items' });
  }
});

// POST /items - Add a new item
app.post('/items', async (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ success: false, message: 'Name and price are required' });
  }

  try {
    const newItem = new ItemModel({ name, price });
    const result = await newItem.save();
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    console.error('Error while saving item:', err);
    res.status(500).json({ success: false, message: 'Error while saving item' });
  }
});

// Serve Angular Frontend
app.use(express.static(path.join(__dirname, 'dist/fin-tech')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/fin-tech/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
