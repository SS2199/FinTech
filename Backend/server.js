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
const cosmosDbKey = process.env.AZURE_COSMOS_CONNECTIONSTRING;


mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Cosmos DB'))
  .catch((err) => console.error('Error connecting to Cosmos DB:', err));

// Sample Mongoose Schema and Model
const ItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Item = mongoose.model('Item', ItemSchema);

// Routes
app.get('/', (req, res) => res.send('API is running...'));

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.status(201).json(newItem);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
