const jwt = require('../controller/jwt/jwt');
const login = require('../database/userModel');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ');

    const payload =  jwt.verify(token[1]);

    const [user] = await login.findById({ id:payload.user });

    if(!user) return res.status(401);

    req.auth = { ...user.toObject() };

    return next();
  } catch (err) {
    console.log(err);
    return next(new Error('Something wrong with credentials'));
  }
};