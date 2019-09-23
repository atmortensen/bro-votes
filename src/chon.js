const { BroNote, Bro } = require('./models');
const moment = require('moment');

module.exports = io => {
  setInterval(async () => {
    try {
      await Bro.updateMany(
        {
          disabled: { $lt: moment().subtract(30, 'minutes') }
        },
        { disabled: null }
      );

      const hallOfFame = await BroNote.find({ superBroNote: true }).lean();
      const sortHallOfFame = () =>
        hallOfFame.sort(
          (a, b) =>
            a.yaBros.length -
            a.noBros.length -
            (b.yaBros.length - b.noBros.length)
        );
      sortHallOfFame();

      const toBeDeleted = await BroNote.find({
        created: { $lt: moment().subtract(24, 'hours') },
        superBroNote: { $ne: true }
      });

      if (toBeDeleted.length) {
        io.emit('update');
      }

      for (let note of toBeDeleted) {
        if (hallOfFame.length < 10) {
          note.superBroNote = true;
          await note.save();
        } else if (
          hallOfFame[0].yaBros.length - hallOfFame[0].noBros.length <
          note.yaBros.length - note.noBros.length
        ) {
          await BroNote.findByIdAndDelete(hallOfFame[0]._id);
          hallOfFame[0] = note;
          sortHallOfFame();
          note.superBroNote = true;
          await note.save();
        } else {
          await note.remove();
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, 1000 * 60);
};
