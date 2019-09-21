module.exports = () => (req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    res.redirect(`https://${req.hostname}${req.url}`);
  } else {
    next();
  }
};
