const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String
  },
  model: {
    type: String
  },
  serialNo: {
    type: String
  },
  warranty: {
    type: Number
  },
  amount: {
    type: Number
  },

  purchaseDate: {
    type: Date
  },

  createdDate: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('product', productSchema);
