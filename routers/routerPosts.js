const express = require('express');
const router = express.Router();
const { create, show, index, update, destroy } = require('../controllers/controllerPosts.js')
const missingPage = require('../middlewares/missingPage.js');

router.post('/', create);

router.get('/:slug', show);

router.get('/', index);

router.put('/:slug', update);

router.delete('/:slug', destroy);


module.exports = router;
