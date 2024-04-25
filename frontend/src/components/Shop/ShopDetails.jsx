// import { csrfFetch } from '../../store/csrf';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
	const location = useLocation();
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const marketObj = useSelector(state => state.shop)

	console.log("%c 🚀 ~ file: ShopDetails.jsx:18 ~ ShopDetails ~ marketObj: ", "color: red; font-size: 25px", marketObj)

	//CART ITEMS NEED TO STAY AS KEY IN LOCAL STORAGE
	const market = Object.values(marketObj);

	console.log("%c 🚀 ~ file: ShopDetails.jsx:23 ~ ShopDetails ~ market: ", "color: red; font-size: 25px", market)

	const theUser = useSelector(state => state.session.user)
	const userStats = theUser.userStats;
	const goldenHour = userStats ? userStats.gold : 0;

	// console.log("%c 🚀 ~ file: ShopDetails.jsx:26 ~ ShopDetails ~ goldenHour: ", "color: red; font-size: 25px", goldenHour)
	const storedGold = parseInt(localStorage.getItem('gold'), 10) || goldenHour;

	const [cart, setCart] = useState([]);
	const [gold, setGold] = useState(storedGold);

	console.log("%c 🚀 ~ file: ShopDetails.jsx:32 ~ ShopDetails ~ gold: ", "color: yellow; font-size: 25px", gold) // needs to be changed in order to reflect live

	const goldRef = useRef(gold);

	// console.log("%c 🚀 ~ file: ShopDetails.jsx:33 ~ ShopDetails ~ goldRef: ", "color: magenta; font-size: 25px", goldRef)
	//* suspect the issue with sustaining gold default in storage is on this component, the userProfile seems fine
	useEffect(() => {

		const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
		setCart(storedCartItems);

		const storedGold = parseInt(localStorage.getItem('gold'), 10) || goldenHour;
		setGold(storedGold)
		dispatch(thunkLoadShop())
		localStorage.setItem('gold', gold.toString());
	}, [goldenHour, dispatch, location, gold])

	useEffect(() => {
		goldRef.current = gold
	}, [gold])



	// useEffect(() => {
	// }, [gold, location]) // in order to reflect as not just NaN, the dep array has to keep track of goldenHour



	const addToCart = (item) => {

		//updating local storage
		setCart(prevCart => {
			prevCart = prevCart || [];
			const updatedCart = [...prevCart, item];
			localStorage.setItem("cartItems", JSON.stringify(updatedCart))
			return updatedCart
		})
		setGold(prevGold => {
			prevGold = gold || prevGold;
			const updatedGold = prevGold;
			setGold(updatedGold)
			localStorage.setItem('gold',
				updatedGold.toString())
			return updatedGold
		})
		// const updatedGold = gold + item.gold
		// localStorage.setItem('gold', updatedGold.toString());
		// return updatedCart
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

		// console.log("%c 🚀 ~ file: ShopDetails.jsx:107 ~ totalCost ~ totalCost: ", "color: pink; font-size: 25px", totalCost)

		// Check if the user has enough gold to make the purchase
		//Get gold from localStorage, a number
		const goldAmt = parseInt(localStorage.getItem('gold') || gold, 10);

		// console.log("%c 🚀 ~ file: ShopDetails.jsx:128 ~ moveItemsToInventory ~ goldAmt: ", "color: orange; font-size: 25px", goldAmt)
		// console.log(gold)


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
		// Update gold in localStorage
		localStorage.setItem('gold', JSON.stringify(goldAmt - totalCost))

		setGold(goldAmt);

		// Clear cart items from both local state and localStorage
		setCart([]);

		localStorage.removeItem("cartItems");
		closeModal()
		localStorage.setItem('cartItems', JSON.stringify([]));

		//check out
		navigate('/inv');
		parseInt(localStorage.getItem('gold'), 10)

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
									location={location}

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
