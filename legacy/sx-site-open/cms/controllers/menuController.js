const MenuItem = require('../models/MenuItem');
const Page = require('../models/Page');

exports.index = async (req, res, next) => {
  try {
    const tree = await MenuItem.findTree();
    const pages = await Page.findAll({ published: 1 });
    res.render('admin/menus/index', { title: 'Menu', items: tree, pages });
  } catch (err) { next(err); }
};

exports.store = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (data.page_id) {
      const page = await Page.findById(data.page_id);
      data.url = '/' + page.slug;
    }
    await MenuItem.create(data);
    req.flash('success', 'Item adicionado.');
    res.redirect('/admin/menus');
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (data.page_id) {
      const page = await Page.findById(data.page_id);
      data.url = data.page_id ? '/' + page.slug : data.url;
    }
    await MenuItem.update(req.params.id, data);
    req.flash('success', 'Item atualizado.');
    res.redirect('/admin/menus');
  } catch (err) { next(err); }
};

exports.destroy = async (req, res, next) => {
  try {
    await MenuItem.delete(req.params.id);
    req.flash('success', 'Item excluído.');
    res.redirect('/admin/menus');
  } catch (err) { next(err); }
};
