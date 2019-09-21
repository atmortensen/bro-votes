const { Bros } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const bro = await Bros.findOne({ handle: req.body.handle });

    if (!bro) {
      return res.status(400).json({ message: 'Handle not found.' });
    }

    if (!bcrypt.compareSync(req.body.password, bro.password)) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    const token = jwt.sign({ _id: bro._id }, process.env.SECRET);

    res.status(200).json({ ...bro.toObject(), token });
  } catch (e) {
    next(e);
  }
};
