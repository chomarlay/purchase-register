const jwt = require('jsonwebtoken');
const config = require('config');
const jwtsecret = config.get('jwtSecret');

module.exports = function(req, res, next) {
  // get token from header
  const token = req.header('x-auth-token');
  // check if token provided
  if (!token) {
    return res.status(401).json({ msg: 'No token.  Authorization denied' });
  }
  try {
    // verify token provided
    const decoded = jwt.verify(token, jwtsecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Invalid token.  Authorization denied' });
  }
};
