const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs'); // For checking file paths
const cors = require('cors'); // Import the CORS package

const app = express();
const port = process.env.PORT || 5000; // Changed to 5000 to match the Angular default port

// Azure Cosmos DB connection string
const mongoURI = "mongodb://celescontainerwebapp-server:Cd8bsmtPGb944jUTWSF6f03i9ZyuoYpKSNd14ZX7rrL5hM9yzcdZF6WidOZABiakigan29ihvSGtACDbgtLJdg==@celescontainerwebapp-server.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@celescontainerwebapp-server@";

// Middleware for parsing JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use CORS middleware to enable cross-origin requests
//app.use(cors()); // This allows all origins by default
app.use(cors({
  origin: 'https://celescontainerwebapp-staging-b5g9ehgkhyb0dpe9.westus3-01.azurewebsites.net', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT'], // Allowed HTTP methods
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://celescontainerwebapp-staging-b5g9ehgkhyb0dpe9.westus3-01.azurewebsites.net');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// Explicitly handle the OPTIONS preflight requests (sometimes necessary)
app.options('*', cors());  // Enable pre-flight for all routes

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

  const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
  });
  
  const ItemModel = mongoose.model('Item', ItemSchema);
  

// Routes

// Endpoint to fetch all items (GET /items)
app.get('/items', async (req, res) => {
  try {
    const items = await ItemModel.find(); // Fetch all items from the MongoDB collection
    res.json({ success: true, items }); // Send the items in JSON format
  } catch (err) {
    console.error('Error retrieving items:', err);
    res.status(500).json({ success: false, message: 'Error retrieving items' });
  }
});

app.post('/items', async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ success: false, message: 'Message is required' });
  }

  try {
    const newItem = new ItemModel({ message });
    const result = await newItem.save();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error('Error while saving item:', err);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ success: false, message: 'Error while saving item' });
  }
});


// Serve static files (index.html) for the frontend
app.get('/', (req, res) => {
  const indexFilePath = path.join(__dirname, 'index.html');
  console.log('Sending index.html from:', indexFilePath);

  if (fs.existsSync(indexFilePath)) {
    res.sendFile(indexFilePath); // Send the index.html file as a response
  } else {
    res.status(404).send('index.html not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
