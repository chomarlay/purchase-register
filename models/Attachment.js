const mongoose = require('mongoose');
const attachmentSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
  },

  fileName: {
    type: String,
    required: true,
  },

  contentType: {
    type: String,
    required: true,
  },

  attachmentFile: {
    type: Buffer,
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('attachment', attachmentSchema);
