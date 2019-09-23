const { BroNote } = require('../models');

module.exports = async (req, res, next) => {
  try {
    if (req.bro.disabled) {
      return res.status(401).json({
        message:
          'Bro! You got too many "no bros". We had to disable your account for 24 hours.'
      });
    }

    if (req.body.note.length > 140) {
      return res.status(400).json({ message: 'Too long of a note bro.' });
    }

    const broNote = await BroNote.create({
      broId: req.bro._id,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      note: req.body.note,
      created: new Date()
    });

    res.io.emit('update');

    res.status(200).json(broNote);
  } catch (e) {
    next(e);
  }
};
