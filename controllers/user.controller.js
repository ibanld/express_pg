const User = require('../models/Users.model')
const bcrypt = require('bcryptjs')

// Validate E-mail function using RegEx
const validateMail = email => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    const check = emailRegexp.test(email)
    return check
}

exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll()
        if (!users) {
          return res.send({
                        message: 'Não foram achados usuários',
                        data: []
                })
        } else {
          return res.send({
                    message: 'Lista de Usuarios carregada',
                    data: users
                })
        }
    } catch (err) {
       return res.send({message: 'Algo nao deu certo!'})
    }
}

exports.findOne = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByPk(id)
        if (!user) {
           return res.send({ 
                    message: `Não foi achado nenhum usuário com ID ${id}`,
                    data: {} 
                })
        } else {
           return res.send({ 
                        message: 'Usuario foi achado',
                        data: user 
                    })
        }
    } catch (err) {
      return res.send({message: 'There was an error retrieving the User'})
    }
}

exports.addUser = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username) {
           return res.send({ message: 'Nao ha um email' })
        }
        if (!password) {
            return res.send({ message: 'Nao ha uma senha' })
        }

        if (email && password) {
            // Check if user is already in the database
            const myUser = await User.findOne({where: { username: username }})
            if (myUser) {
                return res.send({ message: `Usuário com E-Mail ${username} já está cadastrado`})
            } else {
                // Check if E-Mail provided has a valid format
                const validEmail = validateMail(username)
                if (validEmail) {
                    // Encrypt User password before saving
                    const hash = bcrypt.hashSync(password, 10)
                    // Save User into DB
                    const saveUser = await User.create({
                       username: username,
                       password: hash
                    })
                    // Inform User was created
                    if (saveUser) {
                        return res.send({ 
                                    message: `Usuário com E-Mail: ${username} foi criado`,
                                    data: saveUser 
                                })
                    }
                } else {
                    return res.send({ 
                                message: `${username} não é um E-Mail válido!`,
                                data: {} 
                            })
                }
            }
        } 

    } catch (err) {
       return res.send({message: err.message})
    }
}

exports.updateUser = async (req, res) => {
    try {
        // We receive the user Id from the params /api/users/:id
        const id = req.params.id
        // Action: what are we going to update?
        // Payload: the new value we are saving
        const { type, payload } = req.body
        switch (type) {
            case 'UPDATE_EMAIL':
                const username = { username: payload }
                const updateEmail = await User.update(username, {where: { id: id } })
                if (updateEmail) {
                    return res.send({ message: 'E-Mail foi atualizado' })
                }
            case 'UPDATE_PASSWORD':
                // We receive the actual password and the password to update
                const { newPassword, oldPassword } = payload
                // We retrieve our user from the DB
                const userToUpdate = await User.findByPk(id)
                // Using Bcrypt we compare both passwords
                const checkPassword = bcrypt.compareSync(oldPassword, userToUpdate.senha)
                // If passwords match we update new password into DB
                if (checkPassword) {
                    const hash = bcrypt.hashSync(newPassword, 10)
                    const password = {senha: hash}
                    const updatePassword = await User.update(password, { where: { id: id } })
                    if (updatePassword) {
                        return res.send({ message: 'Senha foi atualizada' })
                    }
                } else {
                    return res.send({ message: 'Senha Errada' })
                }
            default:
                return res.send({ message: `${action} unknown!` })
        }

    } catch (err) {
        return res.send({message: err.message})
    }
}

exports.deleteUser = async (req,res) => {
    try {
        const id = req.params.id
        const delUser = await User.destroy({ where: { id: id } })
        if (delUser) {
            return res.send({ message: 'User was Deleted' })
        }
    } catch (err) {
        return res.send({message: err.message})
    }
}