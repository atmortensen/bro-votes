module.exports = async (req, res, next) => {
  try {
    res.status(200).json(req.bro);
  } catch (e) {
    next(e);
  }
};
