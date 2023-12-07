const { BlogPost, PostCategory, Category, User } = require('../models');

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

const getAll = async () => {
  const allPosts = await BlogPost.findAll({
    attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
    include: [{ model: User,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'] }, { model: Category,
      as: 'categories',
      through: { attributes: [] } }],
  });
  return allPosts;
};

module.exports = {
  createPost,
  getAll,
};