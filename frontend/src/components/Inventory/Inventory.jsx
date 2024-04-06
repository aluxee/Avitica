import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


import './Inventory.css';
import { thunkLoadInventory } from '../../store/inventory';

function Inventory() {
	const dispatch = useDispatch();
	const invObj = useSelector(state => state.inventory)
	const inventory = Object.values(invObj)

	const [inv, setInv] = useState([...inventory]);

	useEffect(() => {
		// const inventoryData = JSON.parse(localStorage.getItem('inventory'));

		dispatch(thunkLoadInventory()).then(invObj => {
			setInv(invObj.Inventory)
		}) //!PRIME EXAMPLE OF REFRESH
	}, [dispatch]) //w/o this, list appears (without recently purchased items almost infinitely)


	const moveItemsToInventory = () => {
		// Get cart items from localStorage
		// const cartItems = JSON.parse(localStorage.getItem('cartItems'));
		const inventory = JSON.parse(localStorage.getItem('inventory'));

		console.log("%c 🚀 ~ file: Inventory.jsx:41 ~ moveItemsToInventory ~ inventory: ", "color: aliceblue; font-size: 25px", inventory)


		// const inventoryData = JSON.parse(localStorage.getItem('inventory') || '[]');

		// Get current inventory items from localStorage
		// const inventoryItems = JSON.parse(localStorage.getItem('inventory') || '[]');
		// const updatedInventoryItems = [...inv, ...cartItems]
		const updatedInventoryItems = [...inv]


		setInv(updatedInventoryItems)

		localStorage.setItem('inventory', JSON.stringify(updatedInventoryItems))

	};




	useEffect(() => {
		// Move items from cart to inventory when the component mounts
		moveItemsToInventory(); //* removing dependency array or adding this function to dependency array, or solely putting it outside of the useEffect causes repeats
	}, []);

	// count how many times an item appears
	const itemCounts = {};
	inv.forEach(item => {
		const itemName = item.itemName;
		itemCounts[itemName] = (itemCounts[itemName] || 0) + 1;
	});

	// make all items unique
	const uniqueItems = inv.filter((item, index, self) =>
		index === self.findIndex(bagItem => (
			bagItem.itemName === item.itemName
		))
	);


	return (
		<>
			<div className='ext outer-inv-container'>
				<div className='inventory'>
					<h1>My Bag</h1>
					<div className='inv-container'>
						{uniqueItems.map((item, index) => (
							// { && }
							<ul key={index} className='bag-items'>
								<div className='sd-inv-img' key={index}>
									<img src={item.Shop?.itemIcon}
										alt={item.itemName} className='shop-img'
									/>
									{itemCounts[item.itemName] > 1 &&
										<p className='quantifier'>
											{itemCounts[item.itemName]}</p>}
								</div>
								<div className='inv-name'>
									{item.itemName}
								</div>

							</ul>
						))}
					</div>
				</div>
			</div>
		</>
	)
}



export default Inventory;
