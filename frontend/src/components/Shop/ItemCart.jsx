// import { useModal } from '../../context/Modal';
import { useState, useEffect, useRef } from 'react';
// import OpenModalButton from '../OpenModalButton/OpenModalButton';
import './ItemCart.css';

function ItemCart({ cart, clearCart, removeItemFromCart }) {


	const [cartBasket, setCartBasket] = useState([]);

	//useRef works with objects, an array of objects but not just an array
	//store cart in useRef to use overtime, and keep mutable value in the .current property
	const cartRef = useRef(cart);
	useEffect(() => {
		// update the cart whenever the cartRef changes
		cartRef.current = cart
	}, [cart])

	//do not change this useEffect, if this is changed, then we can no longer quantify whats inside the cart nor can we see the items in the cart
	useEffect(() => {
		//count items in the cart and update the basket
		if (cartRef.current.length > 0) countCartItems(cartRef.current)
	}, [cart])




	//how can i save the current cart in the cartBasket with the value as item?
	useEffect(() => {
		localStorage.setItem(`${cartRef.current}`, "item")
	})

	//changed cart to cartRef
	const countCartItems = (cartRef) => {
		const updatedCartBasket = cartRef.reduce((acc, item) => {
			const existingItem = acc.find((cartItem) => cartItem.id === item.id);
			if (cartRef.length === 0) {
				acc.push({ quantity: 0 })
			}
			if (existingItem) {
				existingItem.quantity += 1; // Increment quantity if item already exists in cartBasket
			} else {
				acc.push({ ...item, quantity: 1 }); // Add item to cartBasket with initial quantity
			}
			return acc;
		}, []);
		setCartBasket(updatedCartBasket);
	};
	const totalPrice = (cartRef => {
		// Initialize total cost to 0
		let totalCost = 0;

		// Iterate over each item in the cart
		cartRef.forEach((item) => {
			// Add the gold of the current item to the total cost
			totalCost += item.gold * item.quantity;
		});

		// Return the total cost
		return totalCost;
	})

	return (
		<>
			<div className="outer-cart">
				<div className="inner-cart">
					<h1>Current Items</h1>
					<div className='in-the-box'>
						{cartBasket.length > 0 ?
							cartBasket.map((item, index) => (
								<div key={index} className='basket'>
									<div
										className='cart-items'>
										<div className='cart-item-icon'>
											<img src={item.itemIcon} alt={item.itemName} />
										</div>
										<div className='cart-items-ic'>
											{item.itemName}
										</div>
									</div>
									{item.quantity > 1 && <div className='cart-item-quantity'>
										<p>Quantity:</p>
										<p>{item.quantity}</p>
									</div>}

									<button onClick={() => removeItemFromCart(item.id)}>Remove</button>
									<hr style={{ height: "1%", width: "100%", color: "black" }} />
								</div>
							))
							:
							<>
								<div>
									<div>
										No items added yet!
									</div>
									<button
										className='confirm-shop'>Shop Now</button>
								</div>
							</>
						}
						<div className='render-button'>
							{cartBasket?.length > 0 ?
								<>
									<div className='cart-total-price'>
										<div className='label-price'>
											Total:
										</div>
										<div className='fill-price'>
											<div>
												{totalPrice(cartBasket)}
											</div>
											<div>
												gold
											</div>

										</div>
									</div>
									<button
										className='basket-buy'
										type='submit'
										// onPointerCancel={closeModal()}
										onClick={clearCart}
										onSubmit={clearCart}
									>
										Buy Now
									</button>
								</>
								:
								<>
								</>
							}
						</div>
					</div>
				</div>
			</div>
		</>
	)

}

export default ItemCart;
