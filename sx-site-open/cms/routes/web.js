const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');

router.get('/', siteController.home);
router.get('/blog', siteController.blog);
router.get('/blog/:slug', siteController.post);
router.get('/solucoes/:slug', siteController.solution);
router.get('/contato', siteController.contact);
router.get('/:slug', siteController.page);

module.exports = router;
