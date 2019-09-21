const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports.Bros = mongoose.model('bros', {
  handle: { type: String, required: true },
  password: { type: String, select: false, required: true },
  disabled: Date
});

module.exports.BroNotes = mongoose.model('bro-notes', {
  broId: { type: Schema.Types.ObjectId, ref: 'Bros', required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  note: { type: String, required: true },
  created: { type: Date, required: true },
  superBroNote: Boolean
});

module.exports.BroVotes = mongoose.model('bro-votes', {
  broId: { type: Schema.Types.ObjectId, ref: 'Bros', required: true },
  broNoteId: { type: Schema.Types.ObjectId, ref: 'BroNotes', required: true },
  value: { type: Number, required: true, min: -1, max: 1 }
});
