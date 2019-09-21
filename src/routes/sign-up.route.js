const { Bros } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
  try {
    const bro = await Bros.create({
      handle: req.body.handle,
      password: bcrypt.hashSync(req.body.password)
    });

    res.status(200).json(bro);
  } catch (e) {
    next(e);
  }
};
