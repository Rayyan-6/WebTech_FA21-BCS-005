// middlewares/checkAuth.js
function checkAuth(req, res, next) {
    // Implement your custom authentication logic here
    // For example, you might check if a user session exists or if a token is valid
    if (req.session && req.session.user) {
      res.locals.isAuthenticated = true;
    } else {
      res.locals.isAuthenticated = false;
    }
    next();
  }
  
  module.exports = checkAuth;
  