const { BroNotes } = require('../models');

module.exports = async (req, res, next) => {
  try {
    // in a 25 mile radius
    const broNotes = await BroNotes.find().populate('bro-votes');

    res.status(200).json(broNotes);
  } catch (e) {
    next(e);
  }
};
