const { Bro } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const reCAPTCHA = require('recaptcha2');

const recaptcha = new reCAPTCHA({
  siteKey: process.env.RECAPTCHA,
  secretKey: process.env.RECAPTCHA_SECRET
});

module.exports = async (req, res, next) => {
  try {
    if (await Bro.findOne({ handle: req.body.handle.toLowerCase().trim() })) {
      return res.status(400).json({ message: 'Handle not available.' });
    }

    if (
      !req.body.recaptcha ||
      !(await recaptcha.validate(req.body.recaptcha))
    ) {
      return res.status(400).json({ message: "You're a naughty bro." });
    }

    const bro = await Bro.create({
      handle: req.body.handle.toLowerCase().trim(),
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
