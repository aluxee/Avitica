import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useContext, useRef } from 'react';

import { LoggedContext } from '../../context/LoggedProvider';
import { useModal } from '../../context/Modal';
import './InventoryItemDetails.css';
import { thunkGetMaxStats } from '../../store/userStats';
import { thunkLoadInventory, thunkUseRedPotion } from '../../store/inventory';

function InventoryItemDetails({ item, removeItem }) {

	console.log("%c 🚀 ~ file: InventoryItemDetails.jsx:9 ~ InventoryItemDetails ~ item: ", "color: blueviolet; font-size: 25px", item, item.shopId)

	const { user } = useContext(LoggedContext);
	console.log("%c 🚀 ~ file: InventoryItemDetails.jsx:14 ~ InventoryItemDetails ~ user: ", "color: blueviolet; font-size: 25px", user);
	const level = user.userStats.level

	console.log("%c 🚀 ~ file: InventoryItemDetails.jsx:21 ~ InventoryItemDetails ~ level: ", "color: red; font-size: 25px", level)

	const { closeModal } = useModal();
	// const location = useLocation();
	const dispatch = useDispatch();
	const inventory = useSelector(state => state.inventory)

	// console.log("%c 🚀 ~ file: InventoryItemDetails.jsx:22 ~ InventoryItemDetails ~ inventory: ", "color: red; font-size: 25px", inventory)

	const invArr = Object.values(inventory);

	// console.log("%c 🚀 ~ file: InventoryItemDetails.jsx:26 ~ InventoryItemDetails ~ invArr: ", "color: red; font-size: 25px", invArr)

	const invItem = invArr.filter(i => i.shopId === item.shopId)[0]

	console.log("%c 🚀 ~ file: InventoryItemDetails.jsx:18 ~ InventoryItemDetails ~ invItem: ", "color: pink; font-size: 25px", invItem, invItem.id, "and shop id", invItem.shopId)

	const [currInv, setCurrInv] = useState(invArr);
	// console.log("%c 🚀 ~ file: InventoryItemDetails.jsx:26 ~ InventoryItemDetails ~ currInv: ", "color: deepskyblue; font-size: 25px", currInv);
	const [des, setDes] = useState(invItem.Shop.description || "");
	const healthRef = useRef(user.userStats.health);
	const [health, setHealth] = useState(healthRef.current);

	console.log("%c 🚀 ~ file: InventoryItemDetails.jsx:41 ~ InventoryItemDetails ~ health: ", "color: red; font-size: 25px", health)

	const { maxHp } = useSelector(state => state.userStats);


	//! this useEffect may be causing issues that re-render too much

	//grab inventory in storage and set it to currInv state
	// useEffect(() => {
	// 	const storedInventory = JSON.parse(localStorage.getItem('inventory'))
	// 	setCurrInv(storedInventory)
	// }, [invItem, invItem.id, currInv])

	//! this useEffect may be causing issues that re-render too much
	//WATCH ITEM DESCRIPTION DETAILS
	useEffect(() => {
		const updatedDes = invItem.Shop.description.replaceAll(/\\n/g, " ");
		setDes(updatedDes)
		if (invItem.itemName === "Red Potion") {
			invItem.healthBoost = true
			invItem.gear = false
			invItem.wep = false
		}

	}, [invItem.Shop.description, invItem])


	//TODO: click equip changes invItem.equipped to true
	//TODO: click useItem for health potion if health is less than max
	//TODO: click useItem for other potion

	const handleItemUsage = async (item) => {

		console.log("%c 🚀 ~ file: InventoryItemDetails.jsx:103 ~ handleItemUsage ~ item: ", "color: red; font-size: 25px", invItem, invItem.id)
		await dispatch(thunkGetMaxStats(level))
		// the user's health is full, but upon refresh it is displayed as the old health
		await dispatch(thunkUseRedPotion(invItem, invItem.id))



		console.log("%c 🚀 ~ file: InventoryItemDetails.jsx:83 ~ handleItemUsage ~ user.userStats.health: ", "color: red; font-size: 25px", user.userStats, user.userStats.health)
		// if (user.userStats.health === maxHp) {


		// 	alert('You do not have to use this item, you are already full health!');
		// 	closeModal();
		// 	//!! if there's an error with the health being restored in db but resetting per refresh, the alert appears twice
		// } else {
		// 	if (user.userStats.health + 50 >= maxHp) {
		// 		healthRef.current = maxHp
		// 		user.userStats.health = healthRef.current
		// 		setHealth(healthRef.current)
		// 	} else {
		// 		//if user's health is less than max, add + 50 to the user's health(check first)
		// 		healthRef.current = user.userStats.health += 50
		// 		setHealth(healthRef.current)
		// 		// setHealth(user.userStats.health)

		// 		console.log("%c 🚀 ~ file: InventoryItemDetails.jsx:83 ~ handleItemUsage ~ user.userStats: ", "color: red; font-size: 25px", user.userStats)

		// 	}
		// 	//remove selected item from inventory
		// 	removeItem(item, item.id)
		// }
		return user.userStats
	}



	useEffect(() => {
		handleItemUsage()
	}, [maxHp, user.userStats])

	// const handleWepOrGearUsage = (gear) => {

	// }

	// const itemFunctionHandler = () => {

	// }
	return (
		<>
			<div className='outer-inv-item-container'>
				<div className='inner-inv-item-container'>
					<h1>{invItem.itemName}</h1>
					<div className='item-icon'>
						<img src={invItem.Shop.itemIcon} alt={invItem.itemName} />
					</div>
					{/* <div className='item-description'>{item.description}</div> */}
					<div className='item-stats'>
						{des}
					</div>
					{/* <div className='item-cost'>
						<div>
							<i
								style={{ color: 'goldenrod' }} className="fa-solid fa-coins" />
						</div>
						<div id='item-detail-cost'>
							{item.gold} gold
						</div>
					</div> */}
					<div className='add-item'>
						<button type='submit'
							className='add-item-button'
							// onClick={handleItemSubmit}
							//* disable button when:
							//!! item is confirmed healthBoost and health is full
							//!! item is considered equipped
							disabled={invItem.equipped}
						>
							{
								(invItem.itemType) && (<div
								onClick={() => handleItemUsage(invItem)}
								>
									Use Item
								</div>)
							}

							{
								(!invItem.itemType) && (<div>
									Equip
								</div>)
							}
						</button>
					</div>
					{/* <button
						onClick={() => removeItem(invItem, invItem.id)}
					>
						Delete Test
					</button> */}

				</div>

			</div>
		</>
	)
}


export default InventoryItemDetails;
