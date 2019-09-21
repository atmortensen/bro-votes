const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports.Bros = mongoose.model('Bros', {
  handle: String,
  password: String,
  disabled: Date
});

module.exports.Bros = mongoose.model('BroNotes', {
  broId: { type: Schema.Types.ObjectId, ref: 'Bros' },
  location: {
    lat: Number,
    long: Number
  },
  note: String,
  created: Date,
  superBroNote: Boolean
});

module.exports.Bros = mongoose.model('BroVotes', {
  broId: { type: Schema.Types.ObjectId, ref: 'Bros' },
  broNoteId: { type: Schema.Types.ObjectId, ref: 'BroNotes' },
  value: Number
});
