import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { thunkLoadInventory, thunkRemoveInventoryItem } from '../../store/inventory';
import './Inventory.css';
import InventoryItemDetails from './InventoryItemDetails';
import { useModal } from '../../context/Modal';
import { LoggedContext } from '../../context/LoggedProvider';

function Inventory() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const invObj = useSelector(state => state.inventory)
	const inventory = Object.values(invObj);
	const location = useLocation();
	const { closeModal } = useModal();
	const { user } = useContext(LoggedContext);
	console.log("%c 🚀 ~ file: Inventory.jsx:21 ~ Inventory ~ user: ", "color: deepskyblue; font-size: 25px", user, user.userStats.gold);
	const [inv, setInv] = useState([...inventory]);


	useEffect(() => {
		// const inventoryData = JSON.parse(localStorage.getItem('inventory'));

		dispatch(thunkLoadInventory()).then(invObj => {
			setInv(invObj.Inventory)
		}) //PRIME EXAMPLE OF REFRESH

	}, [dispatch, location]) //w/o this, list appears (without recently purchased items stacked)


	const removeItem = async (item, itemId) => {
		if (itemId) {

			//grab inventory array in LS
			const inventory = JSON.parse(localStorage.getItem('inventory'))

			console.log("%c 🚀 ~ file: InventoryItemDetails.jsx:44 ~ removeItem ~ inventory: ", "color: deepskyblue; font-size: 25px", inventory)
			// updated inventory array in LS to be array without selected item
			const updatedInventory = inventory.filter(i => i.id !== itemId)
			await dispatch(thunkRemoveInventoryItem(itemId))
			console.log("%c 🚀 ~ file: Inventory.jsx:46 ~ removeItem ~ item: ", "color: blue; font-size: 25px", item, item.id, itemId)
			localStorage.setItem('inventory', JSON.stringify(updatedInventory))
			setInv(updatedInventory)
			closeModal();
			await dispatch(thunkLoadInventory())
			navigate('/inv');
		}
	}


	const moveItemsToInventory = () => {

		const updatedInventoryItems = [...inv]
		setInv(updatedInventoryItems)

		localStorage.setItem('inventory', JSON.stringify(updatedInventoryItems))

	};

	useEffect(() => {
		// Move items from cart to inventory when the component mounts
		moveItemsToInventory(); //* removing dependency array or adding this function to dependency array, or solely putting it outside of the useEffect causes repeats
	}, [location, invObj]);


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
									<OpenModalMenuItem
										className="item-details-modal"
										itemText={
											<img src={item.Shop?.itemIcon}
												alt={item.itemName} className='shop-img'
											/>
										}
										modalComponent={<InventoryItemDetails
											item={item}
											// index={index}
										// 	itemId={item.id}
											removeItem={removeItem}
										/>}
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
