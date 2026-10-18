const Setting = require('../models/Setting');

exports.index = async (req, res, next) => {
  try {
    const settings = await Setting.getAll();
    res.render('admin/settings/index', { title: 'Configurações', settings });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    for (const [key, value] of Object.entries(req.body)) {
      await Setting.set(key, value);
    }
    req.flash('success', 'Configurações salvas.');
    res.redirect('/admin/settings');
  } catch (err) { next(err); }
};
