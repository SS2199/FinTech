const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create app instance
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection String (replace with your Azure Cosmos DB URI)
const cosmosDbKey = process.env.AZURE_COSMOS_CONNECTIONSTRING;  // Ensure you set the correct environment variable for your connection string

// Determine the Mongo URI for connecting to Cosmos DB
const mongoURI = cosmosDbKey || 'mongodb://127.0.0.1:27017/';  // Use local DB as a fallback

// Connect to MongoDB (Cosmos DB)
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Cosmos DB'))
  .catch((err) => console.error('Error connecting to Cosmos DB:', err));

// Sample Mongoose Schema and Model
const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Item = mongoose.model('Item', ItemSchema);

// Routes
app.get('/', (req, res) => res.send('API is running...'));

// Route to get all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();  // Find all items in the database
    res.json(items);  // Send the list of items as JSON response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });  // Handle errors
  }
});

// Route to create a new item
app.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);  // Create a new item from the request body
    await newItem.save();  // Save the item to the database
    res.status(201).json(newItem);  // Respond with the created item
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });  // Handle errors
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
