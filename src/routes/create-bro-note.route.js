const { BroNote } = require('../models');

module.exports = async (req, res, next) => {
  try {
    if (req.bro.disabled) {
      return res.status(401).json({
        message:
          'Bro! You got too many "down bros". We had to disable your account for 24 hours.'
      });
    }

    const broNote = await BroNote.create({
      broId: req.bro._id,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      note: req.body.note,
      created: new Date()
    });

    res.status(200).json(broNote);
  } catch (e) {
    next(e);
  }
};
