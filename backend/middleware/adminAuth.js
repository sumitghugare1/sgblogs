const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  console.log('Admin authentication middleware accessed');
  console.log('Request headers:', JSON.stringify(req.headers));

  // Check if no token
  if (!token) {
    console.log('No token provided in admin request');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    console.log('Verifying admin token');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Make sure decoded.user exists
    if (!decoded.user || !decoded.user.id) {
      console.log('Invalid token structure - user data missing');
      return res.status(401).json({ msg: 'Token is invalid' });
    }
    
    req.user = decoded.user;
    
    // Check if user is admin
    console.log(`Finding user with ID: ${req.user.id}`);
    const user = await User.findById(req.user.id);
    
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ msg: 'User not found' });
    }
    
    if (!user.isAdmin) {
      console.log('User is not an admin');
      return res.status(403).json({ msg: 'Not authorized as admin' });
    }
    
    // Add the user object to the request for later use
    req.adminUser = user;
    console.log(`Admin authentication successful for user: ${user.username}`);
    next();
  } catch (err) {
    console.error('Admin authentication error:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
