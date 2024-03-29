const { User } = require('../models');

const createUser = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });

  return newUser;
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  return user;
};

module.exports = {
  createUser,
  getAll,
  getById,
};