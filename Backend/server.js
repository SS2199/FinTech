const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect('mongodb://celescontainerwebapp-server:Cd8bsmtPGb944jUTWSF6f03i9ZyuoYpKSNd14ZX7rrL5hM9yzcdZF6WidOZABiakigan29ihvSGtACDbgtLJdg==@celescontainerwebapp-server.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@celescontainerwebapp-server@', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Schema and Model
const MessageSchema = new mongoose.Schema({
  text: String,
});
const Message = mongoose.model('Message', MessageSchema);

// Endpoints
app.get('/items', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching messages' });
  }
});

app.post('/add-item', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error adding message' });
  }
});

app.delete('/delete-item/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting message' });
  }
});

app.put('/update-item/:id', async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, updatedMessage });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating message' });
  }
});

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));
