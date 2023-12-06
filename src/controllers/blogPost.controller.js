// const jwt = require('jsonwebtoken');
const BlogPostService = require('../services/blogPost.service');
const { Category } = require('../models');

// const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

// const getUserIdByToken = (token) => {
//   const decoded = jwt.verify(token, secret);
//   const { userId } = decoded;
//   return userId;
// };

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    // const token = req.headers.authorization.split(' ')[1];
    const { id } = res.locals.user;
    
    const categories = await Category.findAll({ where: { id: categoryIds } });
    if (categories.length !== categoryIds.length) {
      return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }

    const newPost = await BlogPostService.createPost(title, content, categoryIds, id);
    return res.status(201).json(newPost);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
};