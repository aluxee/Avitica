import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


import './ShopDetails.css';
import { thunkLoadShop } from '../../store/shop';


function ShopDetails() {
	const dispatch = useDispatch();
	const market = useSelector(state => state.Shop)

	console.log("%c 🚀 ~ file: ShopDetails.jsx:12 ~ ShopDetails ~ market: ", "color: red; font-size: 25px", market)

	useEffect(() => {
		dispatch(thunkLoadShop())
	}, [dispatch])


	return (

		<>
			<div className="ext outer-shop-container">
				<div className="int inner-shop-container">
					<h1>Gold Shop</h1>
					<div className='main-shop'>

					</div>
				</div>
			</div>
		</>
	)

}


export default ShopDetails;
