// const jwt = require('jsonwebtoken');

const middlewareLogin = (req, res, next) => {
  try {
    const isBodyValid = (email, password) => email && password;
    const { email, password } = req.body;
    if (!isBodyValid(email, password)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    
    next();
  } catch (err) {
    console.error(err.message);
    return res.sendStatus(401);
  }
};

module.exports = {
  middlewareLogin,
};