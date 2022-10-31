import React, { createContext, useContext, useState } from 'react';

interface CartItem {
	id: number;
	title: string;
	price: number;
}

interface CartItems {
	item: CartItem;
	count: number;
}

interface CartStore {
	items: CartItems[];
	addItemToCart: (item: CartItem) => void;
	removeItemFromCart: (id: CartItem['id']) => void;
}

const CartStoreContext = createContext<CartStore | null>(null);

export const CartStoreContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [cartStore, setCartStore] = useState<CartItems[]>([]);
	console.log(cartStore);

	const addItemToCart = (item: CartItem) => {
		const seekedItem = cartStore.find((seekedItem) => seekedItem.item.id === item.id);
		if (!seekedItem) {
			setCartStore((prevState) => [...prevState, { item, count: 1 }]);
		} else {
			setCartStore((prevState) =>
				prevState.map((cartItem) => {
					if (cartItem.item.id === item.id) {
						return { ...cartItem, count: cartItem.count + 1 };
					}
					return cartItem;
				}),
			);
		}
	};

	const removeItemFromCart = (id: CartItem['id']) => {
		const seekedItem = cartStore.find((seekedItem) => seekedItem.item.id === id);
		if (!seekedItem) {
			throw new Error('Trying to remove item that not exist!');
		}
		if (seekedItem.count === 1) {
			setCartStore((prevState) => prevState.filter((item) => item.item.id !== id));
		} else {
			setCartStore((prevState) =>
				prevState.map((cartItem) => {
					if (cartItem.item.id === id) {
						return { ...cartItem, count: cartItem.count - 1 };
					}
					return cartItem;
				}),
			);
		}
	};

	return (
		<CartStoreContext.Provider value={{ addItemToCart, removeItemFromCart, items: cartStore }}>
			{children}
		</CartStoreContext.Provider>
	);
};

export const useCartStore = () => {
	const CartContext = useContext(CartStoreContext);

	if (CartContext === null) {
		throw new Error('CartStoreContext has to used inside CartStoreContext.Provider');
	}
	return CartContext;
};
