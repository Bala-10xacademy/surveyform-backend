const mongoose = require('mongoose');

const quesSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    
  }
});

const quesModel = mongoose.model('ques', quesSchema);

module.exports = quesModel;
