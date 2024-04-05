import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


import './Inventory.css';
import { thunkLoadInventory } from '../../store/inventory';

function Inventory() {
	const dispatch = useDispatch();
	const invObj = useSelector(state => state.inventory)
	console.log("%c 🚀 ~ file: Inventory.jsx:12 ~ Inventory ~ invObj: ", "color: red; font-size: 25px", invObj)

	const inventory = Object.values(invObj)
	const [inv, setInv] = useState(inventory || []);

	useEffect(() => {
		dispatch(thunkLoadInventory())
	}, [dispatch])

	useEffect(() => {
		const inventoryData = JSON.parse(localStorage.getItem('inventory') || '[]');
		setInv(prevInv => [...prevInv, inventoryData])
	}, [])


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
