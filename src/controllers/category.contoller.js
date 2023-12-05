const CategoryService = require('../services/category.service');

const error500Message = 'Algo deu errado';

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: '"name" is required',
      }); 
    }
    const newCategory = await CategoryService.createCategory(name);
    return res.status(201).json(newCategory);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error500Message });
  }
};

const getAll = async (_req, res) => {
  try {
    const categories = await CategoryService.getAll();
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

module.exports = {
  createCategory,
  getAll,
};