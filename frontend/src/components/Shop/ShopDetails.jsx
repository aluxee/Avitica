import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import './ShopDetails.css';
import { thunkLoadShop } from '../../store/shop';
import ItemDetails from './ItemDetails';
import ItemCart from './ItemCart';
import { useModal } from '../../context/Modal';

function ShopDetails() {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const marketObj = useSelector(state => state.shop)
	const market = Object.values(marketObj)
	// const [showMenu, setShowMenu] = useState(false);
	const [cart, setCart] = useState([]);

	useEffect(() => {
		dispatch(thunkLoadShop())
	}, [dispatch])

	// function for handling items inside cart
	const addToCart = (item) => {
		setCart([...cart, item])

		console.log('Cart after adding item:', cart);

		console.log("%c 🚀 ~ file: ShopDetails.jsx:30 ~ addToCart ~ cart: ", "color: coral; font-size: 25px", cart)
		console.log("%c 🚀 ~ file: ShopDetails.jsx:30 ~ addToCart ~ setCart: ", "color: coral; font-size: 25px", setCart)
	}

	// const removeFromCart = (item) => {

	// }




	return (

		<>
			<div className="ext outer-shop-container">
				<div className="int inner-shop-container">
					<div className='shopping-cart'>
						<OpenModalMenuItem
							itemText={
								<div>
									<i className="fa-solid fa-cart-plus" />
									{cart.length > 0 && <span className='numberItems'>{cart.length}</span>}
								</div>
							}
							modalComponent={
								<ItemCart
									cart={cart}
									key={cart.map(item => item.id).join()}
								// item={item} itemId={item.id}

								// isSelected={item.id === selectedItem.id}
								// onClick={() => setSelectedItem(item)}
								/>
							}
							onButtonClick={closeModal}
						/>
					</div>
					<h1>Gold Shop</h1>
					<div className='main-shop'>
						{market.map((shop, index) => (

							<ul className='sd-shop' key={index}>
								<div className='sd-shop-img'>
									<OpenModalMenuItem
										className="item-details-modal"
										itemText={
											<img src={shop.itemIcon} alt={shop.itemIcon} className='shop-img'
											/>
										}
										itemName={shop.itemIcon}
										// onItemClick={toggleMenu}
										modalComponent={<ItemDetails
											index={index}
											item={shop} id={shop.id}
											onAddToCart={addToCart}
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
