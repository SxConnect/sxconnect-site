const Post = require('../models/Post');
const Category = require('../models/Category');

exports.index = async (req, res, next) => {
  try {
    const posts = await Post.findAll({});
    res.render('admin/posts/index', { title: 'Not\u00edcias', posts });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.render('admin/posts/form', { title: 'Nova Not\u00edcia', post: null, categories });
  } catch (err) { next(err); }
};

exports.store = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = '/uploads/' + req.file.filename;
    await Post.create(data);
    req.flash('success', 'Not\u00edcia criada.');
    res.redirect('/admin/posts');
  } catch (err) { next(err); }
};

exports.edit = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send('Not\u00edcia n\u00e3o encontrada');
    const categories = await Category.findAll();
    res.render('admin/posts/form', { title: 'Editar Not\u00edcia', post, categories });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = '/uploads/' + req.file.filename;
    await Post.update(req.params.id, data);
    req.flash('success', 'Not\u00edcia atualizada.');
    res.redirect('/admin/posts');
  } catch (err) { next(err); }
};

exports.destroy = async (req, res, next) => {
  try {
    await Post.delete(req.params.id);
    req.flash('success', 'Not\u00edcia exclu\u00edda.');
    res.redirect('/admin/posts');
  } catch (err) { next(err); }
};
