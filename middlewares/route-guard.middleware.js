const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect('/auth/login');
    }else if (req.session.currentUser) {
        req.app.locals.isLoggedIn = true;
    } else {
        req.app.locals.isLoggedIn = false;
    }
    console.log('req.app.locals.isLoggedIn: ', req.app.locals.isLoggedIn);
    next();
  };  
  
  
  module.exports = {
    isLoggedIn,
    isLoggedOut,
    isAdminMiddleware,
    roleMiddleware
  };