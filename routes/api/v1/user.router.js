const router = require('express').Router()
const users = require('../../../controllers/user.controller')

//  @route      POST /api/v1/users/register
//  @access     public
//  @desc       Register user
router.post('/register', users.addUser)

//  @route      POST /api/v1/users/login
//  @access     public
//  @desc       Login user
// router.post('/login', users.login)

//  @route      GET /api/v1/users
//  @access     public
//  @desc       Retrieve all users
router.get('/', users.findAll)

//  @route      PUT /api/v1/users/:id
//  @access     public
//  @desc       Update User
router.put('/:id', users.updateUser)

//  @route      GET /api/v1/users/:id
//  @access     public
//  @desc       Retrieve User
router.get('/:id', users.findOne)

//  @route      DELETE /api/v1/:id
//  @access     public
//  @desc       Delete User by ID
router.delete('/:id', users.deleteUser)

module.exports = router