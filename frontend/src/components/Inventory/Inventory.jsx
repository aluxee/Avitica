import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


import './Inventory.css';
import { thunkLoadInventory } from '../../store/inventory';

function Inventory() {
	const dispatch = useDispatch();
	const invObj = useSelector(state => state.inventory)
	console.log("%c 🚀 ~ file: Inventory.jsx:12 ~ Inventory ~ invObj: ", "color: red; font-size: 25px", invObj)

	const inventory = Object.values(invObj)
	const [inv, setInv] = useState([...inventory]);



	useEffect(() => {
		dispatch(thunkLoadInventory())
	}, [dispatch])

	useEffect(() => {
		const inventoryData = JSON.parse(localStorage.getItem('inventory') || '[]');
		setInv([inventoryData])
	}, []) //w/o this, list appears (without recently purchased items almost infinitely)


	const moveItemsToInventory = () => {
		// Get cart items from localStorage
		const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

		// const inventoryData = JSON.parse(localStorage.getItem('inventory') || '[]');

		// Get current inventory items from localStorage
		// const inventoryItems = JSON.parse(localStorage.getItem('inventory') || '[]');
		const updatedInventoryItems = [...inv, ...cartItems]
		setInv(updatedInventoryItems)
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


		localStorage.removeItem("cartItems");
		// localStorage.removeItem("inventory")
		// closeModal()

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
									<img src={item.Shop?.itemIcon || item.itemIcon} alt={item.itemName} className='shop-img'
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
