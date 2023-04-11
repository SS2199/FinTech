const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const router = require('./router');

mongoose.connect('mongodb://localhost/ProductsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connected');
}).catch((error) => {
  console.log('Database connection error', error);
});

app.use(cors());
app.use('/api',router)


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
//const server = app.listen(port, () => console.log(`Server listening on port ${port}`));
