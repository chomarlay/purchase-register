const mongoose = require('mongoose');
const Attachment = require('../models/Attachment');
const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  model: {
    type: String,
  },
  serialNo: {
    type: String,
  },
  warranty: {
    type: Number,
  },
  amount: {
    type: Number,
  },

  purchaseDate: {
    type: Date,
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// productSchema.pre('save', () => console.log('Hello from pre save'));

productSchema.pre('remove', function (next) {
  // 'this' is the product being removed. Provide callbacks here if you want
  // to be notified of the calls' result.
  console.log('... preRemove');
  Attachment.remove({ product: this._id }).exec();
  next();
});

module.exports = mongoose.model('product', productSchema);
