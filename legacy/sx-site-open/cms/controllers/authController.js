const User = require('../models/User');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) {
      req.flash('error', 'Credenciais inválidas.');
      return res.redirect('/admin/login');
    }
    const valid = await User.validatePassword(password, user.password);
    if (!valid) {
      req.flash('error', 'Credenciais inválidas.');
      return res.redirect('/admin/login');
    }
    req.session.userId = user.id;
    req.session.userName = user.name;
    req.flash('success', 'Login realizado com sucesso.');
    res.redirect('/admin');
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
};
