import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useContext, useMemo, useRef } from 'react';

import { LoggedContext } from '../../context/LoggedProvider';
import { useModal } from '../../context/Modal';
import './InventoryItemDetails.css';
import { thunkGetMaxStats } from '../../store/userStats';
import { thunkLoadInventory, thunkUseRedPotion } from '../../store/inventory';

function InventoryItemDetails({ item, removeItem }) {

	console.log("%c 🚀 ~ file: InventoryItemDetails.jsx:9 ~ InventoryItemDetails ~ item: ", "color: blueviolet; font-size: 25px", item, item.shopId)

	const { user } = useContext(LoggedContext);
	console.log("%c 🚀 ~ file: InventoryItemDetails.jsx:14 ~ InventoryItemDetails ~ user: ", "color: blueviolet; font-size: 25px", user);
	const dispatch = useDispatch();
	const level = user.userStats.level;
	const { maxHp } = useSelector(state => state.userStats);
	const inventory = useSelector(state => state.inventory);


	const [health, setHealth] = useState(user.userStats.health);
	const healthRef = useRef(health);
	console.log("%c 🚀 ~ file: InventoryItemDetails.jsx:24 ~ InventoryItemDetails ~ health: ", "color: lavender; font-size: 25px", health)

	const replenishHealth = useSelector(state => state.inventory.userStats?.health)

	console.log("%c 🚀 ~ file: InventoryItemDetails.jsx:28 ~ InventoryItemDetails ~ replenishHealth: ", "color: red; font-size: 25px", replenishHealth)


	const { closeModal } = useModal();

	// use memoization: optimization technique used to store results in cache from fxn calls(esp $$$ ones) and then using that result when the same input occurs again -- causes changes only when dependencies change

	const invItem = useMemo(() => {
		const invArr = Object.values(inventory);
		return invArr.find(i => i.shopId === item.shopId);
	}, [inventory, item.shopId]);

	const [des, setDes] = useState(invItem.Shop.description || "");


	//WATCH ITEM DESCRIPTION DETAILS
	useEffect(() => {
		const updatedDes = item.Shop.description.replaceAll(/\\n/g, " ");
		setDes(updatedDes)
	}, [invItem.Shop.description, invItem])

	// useEffect(() => {
	// 	if (replenishHealth && health < replenishHealth) {
	// 		setHealth(replenishHealth)
	// 	}

	// }, [replenishHealth])

	const handleItemUsage = async (item) => {
		// e.stopPropagation();
		// e.preventDefault();
		if (!invItem.id) return;
		console.log("%c 🚀 ~ file: InventoryItemDetails.jsx:55 ~ handleItemUsage ~ item: ", "color: pink; font-size: 25px", invItem, invItem.id)

		await dispatch(thunkGetMaxStats(level))
		// the user's health is full, but upon refresh it is displayed as the old health
		if (user.userStats.health === maxHp) {
			alert('You do not have to use this item, you are already full health!');
			return;
		} else {

			const res = await dispatch(thunkUseRedPotion(invItem, invItem.id)) // need the result
			if (res && res.userStats && res.userStats.health !== undefined) {
				setHealth(res.userStats.health);
				user.userStats.health = res.userStats.health || health
				removeItem(invItem, invItem.id);
				closeModal();
			} else {
				console.error('Failed to use red potion or update health.');
			}
		}
	}


		console.log("%c 🚀 ~ file: InventoryItemDetails.jsx:72 ~ handleItemUsage ~ replenishHealth: ", "color: skyblue; font-size: 25px", replenishHealth, user.userStats.health, healthRef.current)



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
								onClick={(e) => handleItemUsage(e, invItem)}
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
