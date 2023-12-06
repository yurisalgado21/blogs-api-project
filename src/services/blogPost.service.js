const { BlogPost, PostCategory } = require('../models');

const createPost = async (title, content, categoryIds, userId) => {
  const updated = new Date();
  const published = new Date();
  const createdPost = await BlogPost.create({ title, content, userId, updated, published });
  const idPost = createPost.id;
  const newPostCategories = categoryIds.map((categorie) => ({ idPost, categorie }));
  await PostCategory.bulkCreate(newPostCategories);

  return createdPost;
};

module.exports = {
  createPost,
};