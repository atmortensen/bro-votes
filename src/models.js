const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports.Bros = mongoose.model('bros', {
  handle: String,
  password: String,
  disabled: Date
});

module.exports.BrosNotes = mongoose.model('bro-notes', {
  broId: { type: Schema.Types.ObjectId, ref: 'Bros' },
  location: {
    lat: Number,
    long: Number
  },
  note: String,
  created: Date,
  superBroNote: Boolean
});

module.exports.BrosVotes = mongoose.model('bro-votes', {
  broId: { type: Schema.Types.ObjectId, ref: 'Bros' },
  broNoteId: { type: Schema.Types.ObjectId, ref: 'BroNotes' },
  value: Number
});
