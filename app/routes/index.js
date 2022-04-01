// Dependencies
const express = require('express');
const controller = require('../controllers/index');
const userAuth = require('../middleware/user_auth')
const route = express.Router();

// home
route.get('/', userAuth, controller.home)

// register
route.post('/register', controller.register )

// login
route.post('/login', controller.login)

// logout
route.get('/logout', controller.logout)

// export of module 
module.exports = route