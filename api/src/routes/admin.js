const server = require('express').Router()
const { User } = require('../db.js')

function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		next()
	} else {
		res.status(401).send('No autorizado')
	}
}

function isAdmin(req, res, next) {
	if (req.user.isAdmin) {
		next()
	} else {
		res.status(403).send('No es un administrador')
	}
}

server.put('/promote/:id', (req, res) => {
	User.findByPk(req.params.id)
		.then((user) => {
			if (!user) return res.status(404).send('Id no válido')
			return user.update({ isAdmin: true })
		})
		.then((user) => res.send(user))
		.catch((err) => res.status(500).send(err))
})

module.exports = server
