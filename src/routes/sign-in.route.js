const { Bros } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const bro = await Bros.findOne({ handle: req.body.handle }).select(
      '+password'
    );

    if (!bro) {
      return res.status(400).json({ message: 'Handle not found.' });
    }

    if (!bcrypt.compareSync(req.body.password, bro.password)) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    const jsonBro = bro.toObject();
    jsonBro.token = jwt.sign({ _id: bro._id }, process.env.SECRET);
    delete jsonBro.password;

    res.status(200).json(jsonBro);
  } catch (e) {
    next(e);
  }
};
