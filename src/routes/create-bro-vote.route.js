const { BroVote } = require('../models');

module.exports = async (req, res, next) => {
  try {
    await BroVote.findOneAndDelete({
      broId: req.bro._id,
      broNoteId: req.body.broNoteId
    });

    const broVote = await BroVote.create({
      broId: req.bro._id,
      broNoteId: req.body.broNoteId,
      value: req.body.value
    });

    res.status(200).json(broVote);
  } catch (e) {
    next(e);
  }
};
