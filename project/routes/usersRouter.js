const express = require('express');
const router = express.Router();
const usersController = require('../controllers/UsersController');


router.get('/login', usersController.getLogin);
router.post('/login', usersController.postLogin);

router.get('/signup', usersController.getSignup);
router.post('/signup', usersController.postSignup);

router.get('/logout', usersController.getLogout);

module.exports = router;
