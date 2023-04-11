// Node.js controller code
const Price = require('./priceModel');

exports.getPrices = (req, res) => {
  Price.find({}, (err, prices) => {
    if (err) {
      res.send(err);
    }
    res.json(prices);
  });
};
