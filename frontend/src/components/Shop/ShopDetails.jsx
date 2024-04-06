// import { csrfFetch } from '../../store/csrf';
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
	//CART ITEMS NEED TO STAY AS KEY IN LOCAL STORAGE
	const market = Object.values(marketObj);
	const goldObj = useSelector(state => state.stats)
	const goldenHour = Object.values(goldObj)
	// console.log("%c 🚀 ~ file: ShopDetails.jsx:26 ~ ShopDetails ~ goldenHour: ", "color: red; font-size: 25px", goldenHour)
	// Extracting the gold amount from the goldObj
	const userGold = goldenHour.length > 0 ? goldenHour[0].gold : 0;
	// console.log("%c 🚀 ~ file: ShopDetails.jsx:30 ~ ShopDetails ~ userGold: ", "color: orange; font-size: 25px", userGold) //1000
	const [cart, setCart] = useState([]);
	const [gold, setGold] = useState(userGold);

	useEffect(() => {
		setGold(userGold)
	}, [goldenHour, userGold]) // in order to reflect as not just NaN, the dep array has to keep track of goldenHour

	// console.log("%c 🚀 ~ file: ShopDetails.jsx:36 ~ ShopDetails ~ gold: ", "color: orange; font-size: 25px", gold) // 1000




	// function for handling items inside cart
	useEffect(() => {
		dispatch(thunkLoadShop())

		const storedCartItems = JSON.parse(localStorage.getItem("cartItems" || "[]"))
		setCart(storedCartItems)

		//* recent add
		const storedGold = parseInt(localStorage.getItem('gold'), 10 || 0)

		// console.log("%c 🚀 ~ file: ShopDetails.jsx:48 ~ useEffect ~ storedGold: ", "color: red; font-size: 25px", storedGold)

		setGold(storedGold)

		console.log("%c 🚀 ~ file: ShopDetails.jsx:52 ~ ShopDetails ~ gold: ", "color: red; font-size: 35px", gold)
		//*
	}, [dispatch, gold])


	const addToCart = (item) => {

		//updating local storage
		setCart(prevCart => {
			prevCart = prevCart || [];
			const updatedCart = [...prevCart, item];
			localStorage.setItem("cartItems", JSON.stringify(updatedCart))
			return updatedCart
		})
		setGold(prevGold => {
			prevGold = prevGold || userGold;
			const updatedGold = prevGold;
			setGold(updatedGold)
			localStorage.setItem('gold',
				updatedGold.toString())
		})

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

		// Get cart items from localStorage, an array
		const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');


		// Calculate total cost of items in the cart
		const totalCost = cartItems.reduce((total, item) => {

			console.log("%c 🚀 ~ file: ShopDetails.jsx:97 ~ totalCost ~ item: ", "color: red; font-size: 25px", item)

			// Ensure item.cost is a number
			const itemCost = typeof item.gold === 'number' ? item.gold : parseFloat(item.gold);
			// Check if itemCost is a valid number
			if (!isNaN(itemCost)) {
				return total + itemCost;
			} else {
				// Log an error if item.cost is not a valid number
				console.error('Invalid item cost:', item.gold);
				return total;
			}
		}, 0); //107

		console.log("%c 🚀 ~ file: ShopDetails.jsx:107 ~ totalCost ~ totalCost: ", "color: pink; font-size: 25px", totalCost)

		// Check if the user has enough gold to make the purchase
		//Get gold from localStorage, a number
		let goldAmt = parseInt(localStorage.getItem('gold', 10) || gold);

		console.log("%c 🚀 ~ file: ShopDetails.jsx:120 ~ moveItemsToInventory ~ gold: ", "color: magenta; font-size: 25px", gold) //1000

		console.log("%c 🚀 ~ file: ShopDetails.jsx:122 ~ moveItemsToInventory ~ goldAmt: ", "color: magenta; font-size: 30px", goldAmt) // 0

		if (goldAmt < totalCost) {
			alert('You do not have enough gold to make this purchase.');
			return; // Exit fxn early if the user doesn't have enough gold
		}

		//get the new inventory items
		await dispatch(thunkAddInventoryItem(cartItems));

		// Get current inventory items from localStorage -- (prob delete later)
		const inventoryItems = JSON.parse(localStorage.getItem('inventory') || '[]');
		//* do the math



		// Add cart items to inventory
		const updatedInventoryItems = [...inventoryItems, ...cartItems];

		const setInventory = localStorage.setItem('inventory', JSON.stringify(updatedInventoryItems)); // transfers to inv key in localstorage

		console.log("%c 🚀 ~ file: ShopDetails.jsx:94 ~ moveItemsToInventory ~ setInventory: ", "color: aquamarine; font-size: 35px", setInventory)

		// since they are trying to purchase, actually reflect the change from the item
		localStorage.setItem('gold', JSON.stringify(goldAmt - totalCost))
		console.log("%c 🚀 ~ file: ShopDetails.jsx:154 ~ moveItemsToInventory ~ gold AFTER SET ITEM of localStorage: ", "color: red; font-size: 25px", gold)



		// Clear cart items from both local state and localStorage
		setCart([]);

		// localStorage.removeItem("cartItems");
		closeModal()
		localStorage.setItem('cartItems', JSON.stringify([]));
		//check out
		navigate('/inv');


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
									itemId={cart && cart.map(item => item.id)}
									clearCart={moveItemsToInventory}
									removeItemFromCart={removeItemFromCart}
								/>
							}
							onButtonClick={closeModal}
						/>
					</div>
					<h1 style={{ color: "goldenrod", fontSize: 45 }}>Gold Shop</h1>
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
											cartItems={market}
											index={index}
											item={shop} itemId={shop.id}
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
