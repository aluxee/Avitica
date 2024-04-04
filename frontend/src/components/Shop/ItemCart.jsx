// import { useModal } from '../../context/Modal';
import { useState, useEffect } from 'react';
import './ItemCart.css';



function ItemCart({ cart }) {
	// const { closeModal } = useModal();
	const [cartBasket, setCartBasket] = useState([]);



	useEffect(() => {
		countCartItems(cart)
	}, [cart, cartBasket])
	//! need to add localStorage logic above but it keeps either changing state structure to not fit to array or break page!

	const countCartItems = (cart) => {
		const updatedCartBasket = cart.reduce((acc, item) => {
			const existingItem = acc.find((cartItem) => cartItem.id === item.id);
			if (existingItem) {
				existingItem.quantity += 1; // Increment quantity if item already exists in cartBasket
			} else {
				acc.push({ ...item, quantity: 1 }); // Add item to cartBasket with initial quantity
			}
			return acc;
		}, []);
		setCartBasket(updatedCartBasket);
	};

	//! do not change logic below

	return (
		<>
			<div className="outer-cart">
				<div className="inner-cart">
					<h1>Current Items</h1>
					<div className='in-the-box'>
						{cartBasket.length > 0 ?
							cartBasket.map((item, index) => (
								<div key={item[index]}>
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
					</div>
				</div>
			</div>
		</>
	)

}

export default ItemCart;
