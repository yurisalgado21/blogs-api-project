const express = require('express');
const UserController = require('./controllers/user.controller');
const CategoryController = require('./controllers/category.contoller');
const BlogPostControllers = require('./controllers/blogPost.controller');
const { User, BlogPost } = require('./models');
const { generateToken } = require('./utils/generateToken');
const { middlewareLogin } = require('./middlewares/middlewareLogin');
const { middlewareUser } = require('./middlewares/middlewareUser');
const { authMiddleware } = require('./middlewares/auth.middleware');
const { middlewarePost, 
  middlewareUpdatedPost, middlewareDeletePost } = require('./middlewares/middlewarePost');
// ...
const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...

app.get('/user', authMiddleware, UserController.getAll);

app.get('/user/:id', authMiddleware, UserController.getById);

app.get('/categories', authMiddleware, CategoryController.getAll);

app.get('/post', authMiddleware, BlogPostControllers.getAll);

app.get('/post/:id', authMiddleware, BlogPostControllers.getById);

app.post('/login', middlewareLogin, async (req, res) => {
  const { email, password } = req.body;
 
  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = generateToken(user.id);
  // console.log(token);
  return res.status(200).json({ token });
});

app.post('/user', middlewareUser, UserController.createUser);

app.post('/categories', authMiddleware, CategoryController.createCategory);

app.post('/post', authMiddleware, middlewarePost, BlogPostControllers.createPost);

app.put('/post/:id', authMiddleware, middlewareUpdatedPost, BlogPostControllers.updatedPost);

app.delete('/post/:id', authMiddleware, middlewareDeletePost, BlogPostControllers.deletePostById);

app.delete('/user/me', authMiddleware, async (req, res) => {
  const { id } = res.locals.user;
  await BlogPost.destroy({ where: { id } });
  return res.status(204).end();
});

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
