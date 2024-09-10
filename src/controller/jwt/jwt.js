const jwt = require('jsonwebtoken');

const generateToken = (userInformation) => {
    const payload = {
      id: userInformation._id,
      email: userInformation.email
    };
  
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); 
  return token;
};

module.exports = {generateToken}