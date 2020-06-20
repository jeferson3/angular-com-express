const router = require('express').Router();
const controller = require('./controllers/user.controller');
const userMiddleware = require('./middlewares/auth.middleware');

router.post('/login', controller.login)
router.get('/users', userMiddleware, controller.get)
router.get('/users/me', userMiddleware, controller.me)
router.post('/users/new', controller.post)
router.delete('users/:id', controller.delete)
router.put('users/:id', controller.put)

module.exports = router;