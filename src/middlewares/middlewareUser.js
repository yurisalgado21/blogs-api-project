const middlewareUser = (req, res, next) => {
  try {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const { displayName, email, password, image } = req.body;

    if (displayName.length < 8) {
      return res.status(400)
        .json({ message: '"displayName" length must be at least 8 characters long' }); 
    }
    if (!regexEmail.test(email)) {
      return res.status(400).json({ message: '"email" must be a valid email' });
    }
    if (password.length < 6) {
      return res
        .status(400).json({ message: '"password" length must be at least 6 characters long' });
    }
    
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  middlewareUser,
};