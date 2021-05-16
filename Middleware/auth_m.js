// const jwt = require('jsonwebtoken');

// module.exports = function (req, res, next) {
//   //Get token from header
//   console.log(req);
//   const token = req.headers('x-auth-token');

//   //Check if not token
//   if (!token) {
//     return res.status(401).json('No token, authorization denied!');
//   }

//   //Verify the token
//   try {
//     const decoded = jwt.verify(token, process.env.jwtSecret);
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is invalid!' });
//   }
// };

const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json('No token, authorization denied!');
  }
  try {
    let decodedData = jwt.verify(token, process.env.jwtSecret);
    req.user = decodedData.user;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
