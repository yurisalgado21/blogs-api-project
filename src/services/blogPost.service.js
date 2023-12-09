const { BlogPost, PostCategory, Category, User } = require('../models');

const createPost = async ({ title, content, categoryIds, id }) => {
  const dateActual = new Date();

  const { dataValues } = await BlogPost.create({ title,
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

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
    include: [{ model: User,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'] }, { model: Category,
      as: 'categories',
      through: { attributes: [] } }],
  });
  return post;
};

const updatedPost = async (id, { title, content }) => {
  await BlogPost.update(
    { title, content },
    { where: { id } },
  );
  const post = await BlogPost.findOne({ where: { id }, 
    attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
    include: [{ model: User,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'] },
    { model: Category, as: 'categories', through: { attributes: [] } }] });
  return post;
};

const deletePostById = async (id) => {
  await BlogPost.destroy({ where: { id } });
};
module.exports = { createPost, getAll, getById, updatedPost, deletePostById };