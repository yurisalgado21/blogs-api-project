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

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error500Message });
  }
};

module.exports = {
  createUser,
  getAll,
  getById,
};