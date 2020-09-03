const server = require('express').Router();
const { Product , Category, Review } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.get('/:id', (req, res) => {
	Product.findOne({ where: { id: req.params.id }, include: [Category, Review] })
		.then((product) => {
			if (!product) return res.status(404).send('Id no válido')
			res.status(200).json(product)
		})
		.catch((err) => res.status(404).send(err))
})

server.post('/', (req, res) => {
	console.log(req.body)
	const { name, description, price, stock, image, categories } = req.body

	if (
		!name ||
		!description ||
		!price ||
		!stock ||
		!image ||
		categories.length === 0
	) {
		res.status(400).send('Debe enviar los campos requeridos')
		return
	}

	Product.create({
		name,
		description,
		price,
		stock,
		image,
	}).then((product) => {
		product
			.setCategories(categories)
			.then(() => res.status(201).send(product))
	})
})

// // Elimina el Producto en base a su ID

// server.delete('/:id', (req, res) => {
// 	Product.findByPk(req.params.id)
// 		.then((product) => {
// 			product.destroy().then(() => {
// 				res.status(200).json(product)
// 			})
// 		})
// 		/.catch((err) => res.status(404).send('Id no valido'))
// })

// // Actualiza el Producto en base a su ID - Le remueve todas sus anteriores categorias y le setea las nuevas
// server.put('/:id', (req, res) => {
// 	const { name, description, price, stock, image, categories } = req.body
	
// 	if (
// 		!name ||
// 		!description ||
// 		!price ||
// 		!stock ||
// 		!image ||
// 		categories.length === 0
// 	) {
// 		res.status(400).send('Debe enviar los campos requeridos')
// 		return
// 	}

// 	Product.findByPk(req.params.id)
// 		.then((product) => {
// 			product.name = req.body.name || product.name
// 			product.description = req.body.description || product.description
// 			product.price = req.body.price || product.price
// 			product.stock = req.body.stock || product.stock
// 			product.image = req.body.image || product.image
// 			product.removeCategories()
// 			product.save().then((prod) => {
// 				prod.setCategories(categories).then(() =>
// 					res.status(201).send(product)
// 				)
// 			})
// 		})
// 		.catch((err) => res.status(404).send('Id no valido'))
// })
// //crear reviews
// server.post("/:id/review", isAuthenticated,  (req, res) => {
// 	const {comments, score, userId} = req.body
	
// if(!score || !comments ){
// 	res.status(400).send('Debe enviar los campos requeridos')
// 	return
// }

// 	Review.create({
// 	comments,
// 	score,
// 	productId: req.params.id,
// 	userId
// 	})
// 	.then(review => res.status(201).send(review))
// 	.catch(err=> res.status(400).send("ERROR EN REVIEW " + err))
// })

// //eliminar reviews
// server.delete("/:idProduct/review/:idReview", isAuthenticated, (req, res) => {
// 	Review.findOne({
// 		where: {
// 			[Op.and]: [
// 				{
// 					productId: req.params.idProduct
// 				},
// 				{
// 					id: req.params.idReview,
// 				},
// 			],
// 		}})
// 	.then(review => {
// 			review.destroy().then(() => {
// 				res.send(review)
// 			})	
// 	})
// 	.catch(() => res.status(404).send('Id no valido'))
// })

// //modificar reviews
// server.put("/:idProduct/review/:idReview", isAuthenticated, (req, res) =>{
// 	const {comments, score, userId} = req.body
	
// 	if(!score || !comments ){
// 		res.status(400).send('Debe enviar los campos requeridos')
// 		return
// 	}

// 	Review.findOne({
// 		where: {
// 			[Op.and]: [
// 				{
// 					productId: req.params.idProduct
// 				},
// 				{
// 					id: req.params.idReview,
// 				},
// 			],
// 		}}).then(review => {
// 			review.userId = userId || review.userId
// 			review.comments = comments || review.comments
// 			review.score = score || review.score
// 			review.save().then(rev => {
// 				res.status(200).send(rev)
// 			} )
// 		})
// 		.catch((err) => res.status(404).send('Id no valido'))
// })

module.exports = server;
