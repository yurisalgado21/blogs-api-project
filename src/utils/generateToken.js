const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const generateToken = (id) => {
  const jwtConfig = {
    expiresIn: '7d',
  };
 
  return jwt.sign({ sub: id, role: 'user' }, secret, jwtConfig);
};

module.exports = {
  generateToken,
};
