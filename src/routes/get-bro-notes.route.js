const { BroNote } = require('../models');
// const geolib = require('geolib');

module.exports = async (req, res, next) => {
  try {
    // if (!req.query.latitude || !req.query.longitude) {
    //   return res
    //     .status(400)
    //     .json({ message: 'Bro! We need your coordinates.' });
    // }

    // const metersIn25Miles = 40233.6;

    // const bounds = geolib.getBoundsOfDistance(
    //   {
    //     latitude: req.query.latitude,
    //     longitude: req.query.longitude
    //   },
    //   metersIn25Miles / 2
    // );

    // const maxLatitude = bounds[1].latitude;
    // const minLatitude = bounds[0].latitude;
    // const maxLongitude = bounds[1].longitude;
    // const minLongitude = bounds[0].longitude;

    const broNotes = await BroNote.find({
      // latitude: { $gt: minLatitude, $lt: maxLatitude },
      // longitude: { $gt: minLongitude, $lt: maxLongitude }
    });

    res.status(200).json(broNotes);
  } catch (e) {
    next(e);
  }
};
