const userService = require('../services/user.service');
const { User } = require('../models');
const { generateToken } = require('../utils/generateToken');

const error500Message = 'Algo deu errado';

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(409).json({
        message: 'User already registered',
      }); 
    }
    const newUser = await userService.createUser(displayName, email, password, image);
    const token = generateToken(newUser.id);

    return res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error500Message });
  }
};

const getAll = async (_req, res) => {
  const users = await userService.getAll();
  return res.status(200).json(users);
};

module.exports = {
  createUser,
  getAll,
};