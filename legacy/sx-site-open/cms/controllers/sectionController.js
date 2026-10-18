const Section = require('../models/Section');

exports.index = async (req, res, next) => {
  try {
    const sections = await Section.findAll({});
    const typeMap = {
      hero: 'Hero', text: 'Texto', cards: 'Cards',
      grid: 'Grid', plans: 'Planos', news: 'Not\u00edcias',
      cta: 'CTA', footer: 'Footer'
    };
    res.render('admin/sections/index', { title: 'Se\u00e7\u00f5es', sections, typeMap });
  } catch (err) { next(err); }
};

exports.create = (req, res) => {
  res.render('admin/sections/form', { title: 'Nova Se\u00e7\u00e3o', section: null });
};

exports.store = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (data.extra_str) {
      try { data.extra = JSON.parse(data.extra_str); } catch { data.extra = {}; }
      delete data.extra_str;
    }
    await Section.create(data);
    req.flash('success', 'Se\u00e7\u00e3o criada.');
    res.redirect('/admin/sections');
  } catch (err) { next(err); }
};

exports.edit = async (req, res, next) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) return res.status(404).send('Se\u00e7\u00e3o n\u00e3o encontrada');
    res.render('admin/sections/form', { title: 'Editar Se\u00e7\u00e3o', section });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (data.extra_str) {
      try { data.extra = JSON.parse(data.extra_str); } catch { data.extra = {}; }
      delete data.extra_str;
    }
    await Section.update(req.params.id, data);
    req.flash('success', 'Se\u00e7\u00e3o atualizada.');
    res.redirect('/admin/sections');
  } catch (err) { next(err); }
};

exports.destroy = async (req, res, next) => {
  try {
    await Section.delete(req.params.id);
    req.flash('success', 'Se\u00e7\u00e3o exclu\u00edda.');
    res.redirect('/admin/sections');
  } catch (err) { next(err); }
};
