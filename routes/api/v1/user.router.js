const router = require('express').Router()
const users = require('../../../controllers/user.controller')
const checkSession = require('../../../middleware/checkSession')

//  @route      POST /api/v1/users/register
//  @access     public
//  @desc       Register user
router.post('/register', users.addUser)

//  @route      GET /api/v1/users
//  @access     private
//  @desc       Retrieve all users
router.get('/', checkSession, users.findAll)

//  @route      PUT /api/v1/users/:id
//  @access     private
//  @desc       Update User
router.put('/:id', checkSession, users.updateUser)

//  @route      GET /api/v1/users/:id
//  @access     private
//  @desc       Retrieve User
router.get('/:id', checkSession, users.findOne)

//  @route      DELETE /api/v1/:id
//  @access     private
//  @desc       Delete User by ID
router.delete('/:id', checkSession, users.deleteUser)

module.exports = router