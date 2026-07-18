const express = require('express');
const router = express.Router();
const { isAuthenticated, isNotAuthenticated } = require('../middleware/auth');
const upload = require('../middleware/upload');

const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const pageController = require('../controllers/pageController');
const sectionController = require('../controllers/sectionController');
const postController = require('../controllers/postController');
const categoryController = require('../controllers/categoryController');
const solutionController = require('../controllers/solutionController');
const menuController = require('../controllers/menuController');
const settingsController = require('../controllers/settingsController');

router.get('/login', isNotAuthenticated, (req, res) => res.render('admin/login', { title: 'Login' }));
router.post('/login', isNotAuthenticated, authController.login);
router.get('/logout', isAuthenticated, authController.logout);

router.get('/', isAuthenticated, adminController.index);

router.get('/pages', isAuthenticated, pageController.index);
router.get('/pages/create', isAuthenticated, pageController.create);
router.post('/pages', isAuthenticated, pageController.store);
router.get('/pages/:id/edit', isAuthenticated, pageController.edit);
router.put('/pages/:id', isAuthenticated, pageController.update);
router.delete('/pages/:id', isAuthenticated, pageController.destroy);

router.get('/sections', isAuthenticated, sectionController.index);
router.get('/sections/create', isAuthenticated, sectionController.create);
router.post('/sections', isAuthenticated, sectionController.store);
router.get('/sections/:id/edit', isAuthenticated, sectionController.edit);
router.put('/sections/:id', isAuthenticated, sectionController.update);
router.delete('/sections/:id', isAuthenticated, sectionController.destroy);

router.get('/posts', isAuthenticated, postController.index);
router.get('/posts/create', isAuthenticated, postController.create);
router.post('/posts', isAuthenticated, upload.single('image'), postController.store);
router.get('/posts/:id/edit', isAuthenticated, postController.edit);
router.put('/posts/:id', isAuthenticated, upload.single('image'), postController.update);
router.delete('/posts/:id', isAuthenticated, postController.destroy);

router.get('/categories', isAuthenticated, categoryController.index);
router.get('/categories/create', isAuthenticated, categoryController.create);
router.post('/categories', isAuthenticated, categoryController.store);
router.get('/categories/:id/edit', isAuthenticated, categoryController.edit);
router.put('/categories/:id', isAuthenticated, categoryController.update);
router.delete('/categories/:id', isAuthenticated, categoryController.destroy);

router.get('/solutions', isAuthenticated, solutionController.index);
router.get('/solutions/create', isAuthenticated, solutionController.create);
router.post('/solutions', isAuthenticated, solutionController.store);
router.get('/solutions/:id/edit', isAuthenticated, solutionController.edit);
router.put('/solutions/:id', isAuthenticated, solutionController.update);
router.delete('/solutions/:id', isAuthenticated, solutionController.destroy);

router.get('/menus', isAuthenticated, menuController.index);
router.post('/menus', isAuthenticated, menuController.store);
router.put('/menus/:id', isAuthenticated, menuController.update);
router.delete('/menus/:id', isAuthenticated, menuController.destroy);

router.get('/settings', isAuthenticated, settingsController.index);
router.post('/settings', isAuthenticated, settingsController.update);

module.exports = router;
