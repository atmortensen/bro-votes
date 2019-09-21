const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports.Bro = mongoose.model('Bro', {
  handle: { type: String, required: true },
  password: { type: String, select: false, required: true },
  disabled: Date
});

module.exports.BroNote = mongoose.model('BroNote', {
  broId: { type: Schema.Types.ObjectId, ref: 'Bro', required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  note: { type: String, required: true },
  created: { type: Date, required: true },
  superBroNote: Boolean,
  yaBros: [{ type: Schema.Types.ObjectId, ref: 'Bro' }],
  noBros: [{ type: Schema.Types.ObjectId, ref: 'Bro' }]
});
