const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Price = new Schema({

  state:{
    type: String
  },
  district: {
    type: String
  },
  market: {
    type: String
  },
  commodity: {
    type: String
  },
  min_price: {
    type: String
  },
  max_price: {
    type: String
  },
  modal_price: {
    type: String
  },



  },
 {
  collection: 'coconut'
})

module.exports = mongoose.model('Price', Price)
