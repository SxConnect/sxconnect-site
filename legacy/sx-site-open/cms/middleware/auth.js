module.exports = {
  isAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
      return next();
    }
    req.flash('error', 'Faça login para acessar o painel.');
    res.redirect('/admin/login');
  },

  isNotAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
      return res.redirect('/admin');
    }
    next();
  },

  flashMessages(req, res, next) {
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');
    res.locals.user = req.session.userId ? { id: req.session.userId, name: req.session.userName } : null;
    res.locals.currentPath = req.path;
    next();
  }
};
