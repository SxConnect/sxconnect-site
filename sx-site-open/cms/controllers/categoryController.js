const Category = require('../models/Category');
const slugify = require('slugify');

exports.index = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.render('admin/categories/index', { title: 'Categorias', categories });
  } catch (err) { next(err); }
};

exports.create = (req, res) => {
  res.render('admin/categories/form', { title: 'Nova Categoria', category: null });
};

exports.store = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.slug) data.slug = slugify(data.name, { lower: true, strict: true });
    await Category.create(data);
    req.flash('success', 'Categoria criada.');
    res.redirect('/admin/categories');
  } catch (err) { next(err); }
};

exports.edit = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send('Categoria não encontrada');
    res.render('admin/categories/form', { title: 'Editar Categoria', category });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.slug) data.slug = slugify(data.name, { lower: true, strict: true });
    await Category.update(req.params.id, data);
    req.flash('success', 'Categoria atualizada.');
    res.redirect('/admin/categories');
  } catch (err) { next(err); }
};

exports.destroy = async (req, res, next) => {
  try {
    await Category.delete(req.params.id);
    req.flash('success', 'Categoria excluída.');
    res.redirect('/admin/categories');
  } catch (err) { next(err); }
};
