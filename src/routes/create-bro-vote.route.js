const { BroNote } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const broNote = await BroNote.findById(req.body.broNoteId);

    broNote.yaBros.pull(req.bro._id);
    broNote.noBros.pull(req.bro._id);

    if (req.body.value === 1) {
      broNote.yaBros.push(req.bro._id);
    } else if (req.body.value === -1) {
      broNote.noBros.push(req.bro._id);
    }

    await broNote.save();

    res.status(200).json(broNote);
  } catch (e) {
    next(e);
  }
};
