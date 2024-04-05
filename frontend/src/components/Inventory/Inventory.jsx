import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


import './Inventory.css';
import { thunkLoadInventory } from '../../store/inventory';

function Inventory() {
	const dispatch = useDispatch();
	const invObj = useSelector(state => state.inventory)
	// console.log("%c 🚀 ~ file: Inventory.jsx:11 ~ Inventory ~ invObj: ", "color: red; font-size: 25px", invObj)
	// upon load, the setInventory in shop details is empty -- upon refresh the inventory storage is empty
	const inventory = Object.values(invObj)

	// console.log("%c 🚀 ~ file: Inventory.jsx:15 ~ Inventory ~ WE HAVE NOW ENTERED THE INVENTORY COMPONENT: ", "color: aliceblue; font-size: 25px", inventory)
	// const updatedInv = localStorage.setItem('inventory', JSON.stringify([inventory]))
	// console.log("%c 🚀 ~ file: Inventory.jsx:18 ~ Inventory ~ updatedInv: ", "color: blue; font-size: 25px", updatedInv)

	const [inv, setInv] = useState([...inventory]);

	useEffect(() => {
		// const inventoryData = JSON.parse(localStorage.getItem('inventory'));

		dispatch(thunkLoadInventory()).then(invObj => {
			setInv(invObj.Inventory)
		}) //!PRIME EXAMPLE OF REFRESH

		// setInv([inventoryData])

	}, [dispatch]) //w/o this, list appears (without recently purchased items almost infinitely)


	const moveItemsToInventory = () => {
		// Get cart items from localStorage
		// const cartItems = JSON.parse(localStorage.getItem('cartItems'));
		const inventory = JSON.parse(localStorage.getItem('inventory'));

		console.log("%c 🚀 ~ file: Inventory.jsx:41 ~ moveItemsToInventory ~ inventory: ", "color: aliceblue; font-size: 25px", inventory)





		// console.log("%c 🚀 ~ file: Inventory.jsx:32 ~ moveItemsToInventory ~ cartItems: ", "color: goldenrod; font-size: 25px", cartItems)


		// const inventoryData = JSON.parse(localStorage.getItem('inventory') || '[]');

		// Get current inventory items from localStorage
		// const inventoryItems = JSON.parse(localStorage.getItem('inventory') || '[]');
		// const updatedInventoryItems = [...inv, ...cartItems]
		const updatedInventoryItems = [...inv]


		setInv(updatedInventoryItems)
		console.log("%c 🚀 ~ file: Inventory.jsx:49 ~ moveItemsToInventory ~ Set the updatedInventoryItems inside of the moveItemsToInventory function: ", "color: skyblue; font-size: 25px", updatedInventoryItems, "also checkout the inv now since it was just set: ", inv)
		// setInv(prevInv => {
		// 	prevInv = prevInv || []

		// 	// Add cart items to inventory
		// 	// const updatedInventoryItems = [...prevInv, ...inventoryItems, ...cartItems];
		// 	const updatedInventoryItems = [...prevInv, ...inventoryItems, ...cartItems];

		// 	console.log("%c 🚀 ~ file: Inventory.jsx:39 ~ moveItemsToInventory ~ updatedInventoryItems: ", "color: red; font-size: 25px", updatedInventoryItems)

		// 	localStorage.setItem('inventory', JSON.stringify(updatedInventoryItems));

		// 	return updatedInventoryItems
		// })
		localStorage.setItem('inventory', JSON.stringify(updatedInventoryItems))

		console.log("%c 🚀 ~ file: Inventory.jsx:75 ~ moveItemsToInventory ~ updatedInventoryItems: ", "color: cornflowerblue; font-size: 30px", updatedInventoryItems)

		// localStorage.removeItem("cartItems");
		// localStorage.removeItem("inventory")
		// closeModal()
		// console.log("%c 🚀 ~ file: Inventory.jsx:53 ~ moveItemsToInventory ~ cart items have been removed: ", "color: red; font-size: 25px", updatedInventoryItems)

	};




	useEffect(() => {
		// Move items from cart to inventory when the component mounts
		moveItemsToInventory(); //* removing dependency array or adding this function to dependency array, or solely putting it outside of the useEffect causes repeats
	}, []);

	console.log("%c 🚀 ~ file: Inventory.jsx:61 ~ Inventory ~ inv: ", "color: red; font-size: 25px", inv)

	return (
		<>
			<div className='ext outer-inv-container'>
				<div className='inventory'>
					<h1>My Bag</h1>
					<div className='inv-container'>
						{inv.map((item, index) => (
							<ul key={index}>
								<div className='sd-inv-img' key={index}>
									<img src={item.Shop?.itemIcon}
										alt={item.itemName} className='shop-img'
									/>
								</div>
								<div className='inv-name'>
									{item.itemName}
								</div>
								{item.quantity > 1 && <p className='quantifier'
									style={{ color: "red" }}>{item.quantity}</p>}
							</ul>
						))}
					</div>
				</div>
			</div>
		</>
	)
}



export default Inventory;
