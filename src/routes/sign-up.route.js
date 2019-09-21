const { Bros } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    if (await Bros.findOne({ handle: req.body.handle })) {
      return res.status(400).json({ message: 'Handle not available.' });
    }

    const bro = await Bros.create({
      handle: req.body.handle,
      password: bcrypt.hashSync(req.body.password)
    });

    const jsonBro = bro.toObject();
    jsonBro.token = jwt.sign({ _id: bro._id }, process.env.SECRET);
    delete jsonBro.password;

    res.status(200).json(jsonBro);
  } catch (e) {
    next(e);
  }
};
