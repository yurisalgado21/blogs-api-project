const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: 'Token not found',
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const claims = jwt.verify(token, secret);
    res.locals.user = {
      id: claims.sub,
      role: claims.role,
    };
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = { authMiddleware };