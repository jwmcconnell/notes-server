const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  }
});


module.exports = mongoose.model('Note', noteSchema);
