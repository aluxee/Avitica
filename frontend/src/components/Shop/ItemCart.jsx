// import { useModal } from '../../context/Modal';
import { useState, useEffect, useRef } from 'react';
import './ItemCart.css';



function ItemCart({ cart }) {
	// const { closeModal } = useModal();
	// const [cartBasket, setCartBasket] = useState([]);
	const [cartBasket, setCartBasket] = useState(() => {
		const cartSaved = localStorage.getItem("cart")
		return cartSaved ? JSON.parse(cartSaved) : [];
	});

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
		countCartItems(cartRef.current)
	}, [cart])

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cartBasket))
	})
	// a useEffect for grabbing the item and cart to localStorage
	useEffect(() => {
		//save the cart items to local storage
		cartRef.current = cartBasket.map(item => {
			console.log("%c 🚀 ~ file: ItemCart.jsx:20 ~ current cartRef ~ item: ", "color: lightblue; font-size: 25px", item)
			// save the items added to the cart in local storage
			localStorage.getItem("item")
			// if (storedItem) {
			// 	setCartBasket(JSON.parse(storedItem))
			// }
			return cartRef.current
		})

		// const cartSaved = localStorage.getItem("cart");

		//! how do you ensure upon refresh, the cart and their items are saved?

	}, [cartBasket, cart])

	//how can i save the current cart in the cartBasket with the value as item?
	useEffect(() => {
		localStorage.setItem(`${cartRef.current}`, "item")
	})

	console.log("%c 🚀 ~ file: ItemCart.jsx:57 ~ useEffect ~ cartRef: ", "color: goldenrod; font-size: 25px", cartRef, "and the current status: ", cartRef.current)

	//changed cart to cartRef
	const countCartItems = (cartRef) => {
		const updatedCartBasket = cartRef.reduce((acc, item) => {
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

//! saved to localStorage but disappears upon refresh
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
