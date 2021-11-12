const router = require('express').Router()
const auth = require('../../../controllers/auth.controller')
const checkSession = require('../../../middleware/checkSession')

//  @route      POST /api/v1/auth/login
//  @access     public
//  @desc       Login user
router.post('/login', auth.login)

//  @route      GET /api/v1/auth/logout
//  @access     private
//  @desc       Logout user
router.get('/logout', checkSession, auth.logout)

module.exports = router