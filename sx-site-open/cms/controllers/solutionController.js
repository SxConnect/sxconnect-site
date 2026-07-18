const Solution = require('../models/Solution');

exports.index = async (req, res, next) => {
  try {
    const solutions = await Solution.findAll({});
    res.render('admin/solutions/index', { title: 'Soluções', solutions });
  } catch (err) { next(err); }
};

exports.create = (req, res) => {
  res.render('admin/solutions/form', { title: 'Nova Solução', solution: null });
};

exports.store = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (data.features_str) {
      data.features = data.features_str.split('\n').map(f => f.trim()).filter(f => f);
    }
    delete data.features_str;
    await Solution.create(data);
    req.flash('success', 'Solução criada.');
    res.redirect('/admin/solutions');
  } catch (err) { next(err); }
};

exports.edit = async (req, res, next) => {
  try {
    const solution = await Solution.findById(req.params.id);
    if (!solution) return res.status(404).send('Solução não encontrada');
    res.render('admin/solutions/form', { title: 'Editar Solução', solution });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (data.features_str) {
      data.features = data.features_str.split('\n').map(f => f.trim()).filter(f => f);
    }
    delete data.features_str;
    await Solution.update(req.params.id, data);
    req.flash('success', 'Solução atualizada.');
    res.redirect('/admin/solutions');
  } catch (err) { next(err); }
};

exports.destroy = async (req, res, next) => {
  try {
    await Solution.delete(req.params.id);
    req.flash('success', 'Solução excluída.');
    res.redirect('/admin/solutions');
  } catch (err) { next(err); }
};
