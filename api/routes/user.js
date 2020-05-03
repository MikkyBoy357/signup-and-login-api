const express = require('express')
const router = express.Router()
//const mongoose = require('mongoose')
//const bcrypt = require('bcrypt')
//const jwt = require('jsonwebtoken')

const User = require('../../models/user')

const UserController = require('../controllers/user_controller')

// post to /signup /
router.post('/signup', UserController.user_post_signup)

// post to /login /
router.post('/login', UserController.user_post_login)

// delete a user
router.delete('/:userId', UserController.user_post_delete)

module.exports = router
