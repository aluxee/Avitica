import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
// import OpenModalButton from '../OpenModalButton/OpenModalButton';
// import ItemCart from './ItemCart';
// import ItemViewAndBuy from './ItemViewAndBuy';
import './ItemDetails.css';
import { thunkLoadCurrentItem } from '../../store/shop';
import { useModal } from '../../context/Modal';


function ItemDetails({ item, onAddToCart }) {
	const dispatch = useDispatch();
	// const [showMenu, setShowMenu] = useState(false);
	const [sideOpen, setSideOpen] = useState(true);
	const [selectedItem, setSelectedItem] = useState('')
	const [des, setDes] = useState(item.description || "")
	const { closeModal } = useModal();


	dispatch(thunkLoadCurrentItem(item.id))

	//WATCH ITEM DESCRIPTION DETAILS
	useEffect(() => {
		const updatedDes = item.description.replaceAll(/\\n/g, " ");
		setDes(updatedDes)
	}, [item.description])

	//WATCH SELECTED ITEM
	useEffect(() => {
		console.log(`selectedItem CHANGED TO`, selectedItem);
		if (selectedItem) setSideOpen(true)
	}, [selectedItem])

	//WATCH SIDE OPEN PANEL
	useEffect(() => {
		console.log('THE SIDE THAT IS OPEN CHANGED TO...', sideOpen)
		if (!sideOpen) {
			setSelectedItem('')
		}
	}, [sideOpen])


	const handleItemSubmit = (e) => {
		e.stopPropagation();

		onAddToCart(item);
		// a number will appear over the cart icon (it's in shopdetails as itemcart modalcomponent) that indicates how many items are in the cart
		//add item to "cart", cart will be the itemCart component
		closeModal()
	}


	return (
		<>
			<div className='outer-shop-item-container'>
				<div className='inner-shop-item-container'>
					<h1>{item.itemName}</h1>
					<div className='item-icon'>
						<img src={item.itemIcon} alt={item.itemName} />
					</div>
					<div className='item-description'>{des}</div>
					<div className='item-stats'>

					</div>
					<div className='item-cost'>
						<div>
							<i
								style={{ color: 'goldenrod' }} className="fa-solid fa-coins" />
						</div>
						<div id='item-detail-cost'>
							{item.gold} gold
						</div>
					</div>
					<div className='add-item'>
						<button type='submit'
							className='add-item-button'
							onClick={handleItemSubmit}
						>
							Add to Cart
						</button>
					</div>

				</div>

			</div>
		</>
	)
}



export default ItemDetails;
