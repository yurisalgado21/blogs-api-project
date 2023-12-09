const blogPostServices = require('../services/blogPost.service');

const middlewarePost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }
      
  next();
};

const middlewareUpdatedPost = async (req, res, next) => {
  const { id } = res.locals.user;
  const idParam = req.params.id;
  const { userId } = await blogPostServices.getById(idParam);
  if (userId !== id) {
    return res.status(401).json({
      message: 'Unauthorized user',
    }); 
  }
  next();
};

const middlewareDeletePost = async (req, res, next) => {
  const { id } = res.locals.user;
  const idParam = req.params.id;
  const post = await blogPostServices.getById(idParam);
  if (!post) {
    return res.status(404).json({
      message: 'Post does not exist',
    }); 
  }
  if (post.userId !== id) {
    return res.status(401).json({
      message: 'Unauthorized user',
    }); 
  }
  next();
};
  
module.exports = {
  middlewarePost,
  middlewareUpdatedPost,
  middlewareDeletePost,
};