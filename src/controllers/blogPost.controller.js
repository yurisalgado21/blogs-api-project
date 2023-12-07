const blogPostServices = require('../services/blogPost.service');
const { Category } = require('../models');
const httpMap = require('../utils/httpMap');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = res.locals.user;

    const categories = await Category.findAll({ where: { id: categoryIds } });
    if (categories.length !== categoryIds.length) {
      return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }

    const { status, data } = await blogPostServices.createPost({ title, content, categoryIds, id });
    const statusHttp = httpMap[status];

    return res.status(statusHttp).json(data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const allPosts = await blogPostServices.getAll();
    return res.status(200).json(allPosts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  const post = await blogPostServices.getById(id);
  if (!post) {
    return res.status(404).json({
      message: 'Post does not exist',
    }); 
  }
  return res.status(200).json(post);
};

module.exports = {
  createPost,
  getAll,
  getById,
};