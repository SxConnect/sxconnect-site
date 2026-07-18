const Page = require('../models/Page');

exports.index = async (req, res, next) => {
  try {
    const pages = await Page.findAll({});
    res.render('admin/pages/index', { title: 'Páginas', pages });
  } catch (err) { next(err); }
};

exports.create = (req, res) => {
  res.render('admin/pages/form', { title: 'Nova Página', page: null });
};

exports.store = async (req, res, next) => {
  try {
    await Page.create(req.body);
    req.flash('success', 'Página criada com sucesso.');
    res.redirect('/admin/pages');
  } catch (err) { next(err); }
};

exports.edit = async (req, res, next) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) return res.status(404).send('Página não encontrada');
    res.render('admin/pages/form', { title: 'Editar Página', page });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    await Page.update(req.params.id, req.body);
    req.flash('success', 'Página atualizada.');
    res.redirect('/admin/pages');
  } catch (err) { next(err); }
};

exports.destroy = async (req, res, next) => {
  try {
    await Page.delete(req.params.id);
    req.flash('success', 'Página excluída.');
    res.redirect('/admin/pages');
  } catch (err) { next(err); }
};
