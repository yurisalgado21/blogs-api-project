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
  
module.exports = {
  middlewarePost,
  middlewareUpdatedPost,
};