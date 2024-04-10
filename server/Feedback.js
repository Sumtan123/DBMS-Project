const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
  Cust_ID: {
    type: Number, 
    required: true,
  },
  Cust_Name: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: () => {
      const currentUTC = new Date();
      const ISTTimestamp = new Date(currentUTC.getTime() + (5.5 * 60 * 60 * 1000));
      return ISTTimestamp;
    }
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;