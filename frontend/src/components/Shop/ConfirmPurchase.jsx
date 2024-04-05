import { useModal } from '../../context/Modal';



function ConfirmPurchase({ cart, clearCart }) {
	const { closeModal } = useModal();
	// once user clicks yes...
	// 1. clear cart of items,
	// 2. close modal
	// 3. bought items should appear in the user's inventory
	function getItemsFromLocalStorage() {
		const cartItems = JSON.parse(localStorage.getItem('cartItems'));
		return cartItems;
	}

	const putItInTheBag = () => {
		const cartItems = getItemsFromLocalStorage();
		const inventoryItems = JSON.parse(localStorage.getItem('inventory'))

		inventoryItems.push(...cartItems);

		localStorage.setItem('inventory', JSON.stringify('inventoryItems'))
		//clear the cart
		// clearCart();
		// close the modal
		closeModal();
		//move the items from shop to inv
		// navigate.push('/inventory');

		const boughtThose = JSON.parse(localStorage.getItem("boughtThose") || [])
		boughtThose.push(...cart)
		localStorage.setItem("boughtThose", JSON.stringify("boughtThose"))

	}

	return (
		<div className="ext confirmation">
			<div className="confirm-buy">
				Confirm Purchase?
				<form action="" onSubmit={putItInTheBag}>

					<button className="yes confirm"
						type='submit'
					>
						Yes! Put it in my bag!
					</button>
					<button className="no confirm"
						onClick={closeModal()}
					>
						Nah, I&apos;ll keep browsing...
					</button>
				</form>
			</div>
		</div>
	)

}

export default ConfirmPurchase;
