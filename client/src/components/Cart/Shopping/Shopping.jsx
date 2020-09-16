import React, { useEffect, useState } from 'react'
import Counter from '../Counter/Counter'
import { deleteProductInCart, getUserProductsCart, removeGuestItem } from '../../../actions'
import { useDispatch, useSelector } from "react-redux";



export const Shopping = ({ guestCart }) => {
	const dispatch = useDispatch()
	// const products = useSelector(state => state.products)
	const userId = useSelector(state => state.userDetails)
	const cart = useSelector(state => state.cart)


	useEffect(() => {
		if (userId) {
			dispatch(getUserProductsCart(userId.id))
		} else if (guestCart) {
			console.log(guestCart)
		}
	}, [cart])

	return (
		<div>
			{userId && cart && cart.length > 0
				? cart.map((product) => (
					<div className='card mb-3 p-3' key={product.id}>
						<div className='row'>
							<div className='col-md-4'>
								<img
									src={`http://localhost:3001/images/${product.image[0]}`}
									className='card-img'
									alt='...'
								/>
							</div>
							<div className='col-md-5'>
								<div className='card-body'>
									<h5 className='card-title'>
										{product.name}
									</h5>
									<p className='card-text'>
										{product.price}
									</p>
								</div>
							</div>
							<div className='col-md-3 d-flex align-items-center justify-content-center'>
								<Counter
									idProduct={product.id}
									quantity={
										product.order_product.quantity
									}
									userId={userId.id}
									stock={product.stock}
								/>
								<button
									className='btn btn-danger align-self-start'
									onClick={() => {
										console.log('me clickeaste..!')
										dispatch(deleteProductInCart(userId.id, product.id))
									}}
								>
									X
								</button>
							</div>
						</div>
					</div>
				))
				: guestCart && guestCart.length > 0
					? guestCart.map((g) => (
						<div className='card mb-3 p-3' key={g.id}>
							<div className='row'>
								<div className='col-md-4'>
									<img
										src={`http://localhost:3001/images/${g.image[0]}`}
										className='card-img'
										alt='...'
									/>
								</div>
								<div className='col-md-5'>
									<div className='card-body'>
										<h5 className='card-title'>
											{g.name}
										</h5>
										<p className='card-text'>
											{g.price}
										</p>
									</div>
								</div>
								<div className='col-md-3 d-flex align-items-center justify-content-center'>
									{/* <Counter
										idProduct={g.id}
										quantity={
											g.order_product.quantity
										}
										userId={userId.id}
										stock={g.stock}
									/> */}
									<button
										className='btn btn-danger align-self-start'
										onClick={() => dispatch(removeGuestItem(g.id))}
											// dispatch(deleteProductInCart(userId.id, g.id))}
									>
										X
								</button>
								</div>
							</div>
						</div>
					))
					: null
			}
		</div>
	)
}

export default Shopping