const express = require('express');
const UserController = require('./controllers/user.controller');
const { User } = require('./models');
const { generateToken } = require('./utils/generateToken');
const { middlewareLogin } = require('./middlewares/middlewareLogin');
const { middlewareUser } = require('./middlewares/middlewareUser');
const { authMiddleware } = require('./middlewares/auth.middleware');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...

app.get('/user', authMiddleware, UserController.getAll);

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

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
