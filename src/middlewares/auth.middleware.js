const jwt = require('jsonwebtoken');
const { Bros } = require('../models');

module.exports = () => {
  return async (req, res, next) => {
    try {
      if (!req.header('Authorization')) {
        return res
          .status(400)
          .json({ message: 'No authorization header...bro.' });
      }

      const { _id } = jwt.verify(
        req.header('Authorization'),
        process.env.SECRET
      );

      const bro = await Bros.findById(_id);

      if (!bro) {
        return res
          .status(401)
          .json({ message: 'Something weird happened bro. Try signing out.' });
      }

      req.bro = bro;

      next();
    } catch (err) {
      next(err);
    }
  };
};
