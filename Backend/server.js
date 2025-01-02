const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // For resolving the path to the dist folder

const app = express();
const port = 3000; // Default port for the app

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoUri = 'mongodb://celescontainerwebapp-server:Cd8bsmtPGb944jUTWSF6f03i9ZyuoYpKSNd14ZX7rrL5hM9yzcdZF6WidOZABiakigan29ihvSGtACDbgtLJdg==@celescontainerwebapp-server.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@celescontainerwebapp-server@';

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Schema and Model
const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const Message = mongoose.model('Message', MessageSchema);

// API Routes
app.get('/api/items', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json({ success: true, messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error fetching messages' });
  }
});

app.post('/api/add-item', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error adding message' });
  }
});

app.delete('/api/delete-item/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error deleting message' });
  }
});

app.put('/api/update-item/:id', async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json({ success: true, updatedMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error updating message' });
  }
});

// Serve Angular Frontend Files from the Dist Folder
const frontendPath = path.join(__dirname, 'dist/fin-tech'); // Adjust this path based on your dist folder name
app.use(express.static(frontendPath)); // Serve static files like JS, CSS, etc. from dist folder

// All other routes should serve the Angular app's index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontendPath, 'index.html')); // Serve index.html for all other routes (Angular routes)
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
