module.exports = {
  ensureAuthenticated1: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/Client/Login');
  },
  forwardAuthenticated1: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/Client_Dashboard');      
  }
};
