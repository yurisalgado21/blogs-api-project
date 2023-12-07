const { BlogPost, PostCategory } = require('../models');

const createPost = async ({ title, content, categoryIds, id }) => {
  const dateActual = new Date();

  const { dataValues } = await BlogPost.create({
    title,
    content,
    userId: id,
    updated: dateActual,
    published: dateActual,
  });
  const postId = dataValues.id;

  const newPostCategories = categoryIds.map((categoryId) => ({ postId, categoryId }));
  await PostCategory.bulkCreate(newPostCategories);

  return { status: 'CREATED', data: dataValues };
};

module.exports = {
  createPost,
};