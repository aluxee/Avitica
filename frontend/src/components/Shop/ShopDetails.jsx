import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import './ShopDetails.css';
import { thunkLoadShop } from '../../store/shop';
import { thunkAddInventoryItem } from '../../store/inventory';
import ItemDetails from './ItemDetails';
import ItemCart from './ItemCart';
import { useModal } from '../../context/Modal';

import { useNavigate } from 'react-router-dom';
function ShopDetails() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const marketObj = useSelector(state => state.shop)
	//CART ITEMS NEED TO STAY AS KEY IN LOCALSTORAGE

	const market = Object.values(marketObj)
	// const [showMenu, setShowMenu] = useState(false);
	const [cart, setCart] = useState([]);

	// function for handling items inside cart
	useEffect(() => {
		dispatch(thunkLoadShop())

		const storedCartItems = JSON.parse(localStorage.getItem("cartItems" || "[]"))

		setCart(storedCartItems)
	}, [dispatch])


	const addToCart = (item) => {

		//updating local storage
		setCart(prevCart => {
			prevCart = prevCart || [];
			const updatedCart = [...prevCart, item];
			localStorage.setItem("cartItems", JSON.stringify(updatedCart))
			return updatedCart
		})
		// 	 JSON.parse(localStorage.getItem("cartItems") || "[]")
		// cartItems.push(item);
		// localStorage.setItem("cartItems", JSON.stringify(cartItems))
	}

	const removeItemFromCart = (itemId) => {
		// Get the current cart items from localStorage
		const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

		// Remove the item with the specified itemId from the cart
		const updatedCartItems = cartItems.filter(item => item.id !== itemId);

		// Update cart in localStorage with the updated cart items
		localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

		// Update the local state
		setCart(updatedCartItems);
		closeModal();
	}



	const removeFromCart = () => {
		setCart([])
		localStorage.removeItem("cartItems")
	}


	const moveItemsToInventory = async () => {


		//* listed issues:
		// - once item is added to the inv, when redirected it does not show until another
		// - upon refresh / initial render of inventory, the inventory shows blank
		// - upon moving item from shop to inv, the inv icon is only stuck on the hp potion one
		// - not quantifying the duplicates together

		//*
		// Get cart items from localStorage, an array
		const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

		//get the new inventory items
		await dispatch(thunkAddInventoryItem(cartItems));

		// console.log("%c 🚀 ~ file: ShopDetails.jsx:85 ~ moveItemsToInventory ~ cartItems: ", "color: pink; font-size: 25px", cartItems); //icon still intact

		// Get current inventory items from localStorage -- (prob delete later)
		const inventoryItems = JSON.parse(localStorage.getItem('inventory') || '[]');

		console.log("%c 🚀 ~ file: ShopDetails.jsx:90 ~ moveItemsToInventory ~ inventoryItems: ", "color: pink; font-size: 25px", inventoryItems)


		// Add cart items to inventory
		const updatedInventoryItems = [...inventoryItems, ...cartItems];

		console.log("%c 🚀 ~ file: ShopDetails.jsx:96 ~ moveItemsToInventory ~ updatedInventoryItems: ", "color: orange; font-size: 35px", updatedInventoryItems)

		const setInventory = localStorage.setItem('inventory', JSON.stringify(updatedInventoryItems)); // transfers to inv key in localstorage

		console.log("%c 🚀 ~ file: ShopDetails.jsx:94 ~ moveItemsToInventory ~ setInventory: ", "color: aquamarine; font-size: 35px", setInventory)


		// Clear cart items from both local state and localStorage
		setCart([]);

		// localStorage.removeItem("cartItems");
		closeModal()
		localStorage.setItem('cartItems', JSON.stringify([]));
		//check out
		navigate('/inv');
		console.log("%c 🚀 ~ file: ShopDetails.jsx:80 ~ moveItemsToInventory ~ WE ARE NOW AT THE END OF MOVEITEMSTOINVENTORY FUNCTION: ", "color: violet; font-size: 35px")

	};



	return (

		<>
			<div className="ext outer-shop-container">
				<div className="int inner-shop-container">
					<div className='shopping-cart'>
						<OpenModalMenuItem
							itemText={
								<div
								// key={cart}
								>
									<i className="fa-solid fa-cart-plus" />
									{cart && cart.length > 0 ? <span className='numberItems'>{cart.length}</span> : <></>}
								</div>
							}
							modalComponent={
								<ItemCart
									cart={cart}
									key={cart && cart.map(item => item.id).join()}
									clearCart={moveItemsToInventory}
									removeItemFromCart={removeItemFromCart}
								/>
							}
							onButtonClick={closeModal}
						/>
					</div>
					<h1>Gold Shop</h1>
					<div className='main-shop'>
						{market.map((shop, index) => (

							<ul className='sd-shop' key={index}>
								<div className='sd-shop-img' key={index}>
									<OpenModalMenuItem
										className="item-details-modal"
										key={index}
										itemText={
											<img src={shop.itemIcon} alt={shop.itemIcon} className='shop-img'
											/>
										}
										itemName={shop.itemIcon}
										// onItemClick={toggleMenu}
										modalComponent={<ItemDetails
											index={index}
											item={shop} id={shop.id}
											onAddToCart={addToCart}
											clearCart={removeFromCart}
										/>}
									/>


								</div>
								<li>{shop.itemName}</li>
								<div className='sd-div'>
									<div>
										<i
											style={{ color: 'goldenrod' }} className="fa-solid fa-coins" />
									</div>
									<div id='shop-gold'>
										{shop.gold}
									</div>
								</div>

							</ul>
						)
						)}
					</div>
				</div>
			</div>
		</>
	)

}


export default ShopDetails;
