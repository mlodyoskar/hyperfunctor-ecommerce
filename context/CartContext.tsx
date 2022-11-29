import React, { createContext, useContext, useEffect, useState } from 'react';

const LOCAL_STORAGE_CART_KEY = 'HYPERFUNCTOR_CART';
interface CartItem {
	readonly id: string;
	readonly title: string;
	readonly price: number;
}

interface CartItems {
	readonly item: CartItem;
	readonly count: number;
}

interface CartStore {
	readonly items: CartItems[];
	readonly addItemToCart: (item: CartItem) => void;
	readonly removeItemFromCart: (id: CartItem['id']) => void;
	readonly removeAllItemsFromCart: () => void;
}

const CartStoreContext = createContext<CartStore | null>(null);

const getItemsFromStorage = () => {
	try {
		const itmesFromStorage = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
		if (!itmesFromStorage) {
			return [];
		}
		const items = JSON.parse(itmesFromStorage);
		return items;
	} catch (err) {
		return [];
	}
};

const addItemsToStorage = (items: CartItems[]) => {
	localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(items));
};

export const CartStoreContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [cartStore, setCartStore] = useState<CartItems[]>([]);

	useEffect(() => {
		setCartStore(getItemsFromStorage());
	}, []);

	useEffect(() => {
		if (cartStore && cartStore.length === 0) {
			return;
		}
		if (!cartStore) {
			return;
		}

		addItemsToStorage(cartStore);
	}, [cartStore]);

	const addItemToCart = (item: CartItem) => {
		const seekedItem = cartStore.find((seekedItem) => seekedItem.item.id === item.id);
		if (!seekedItem) {
			setCartStore((prevState) => [...prevState, { item, count: 1 }]);
		} else {
			setCartStore((prevState) =>
				prevState?.map((cartItem) => {
					if (cartItem.item.id === item.id) {
						return { ...cartItem, count: cartItem.count + 1 };
					}
					return cartItem;
				}),
			);
		}
	};

	const removeAllItemsFromCart = () => {
		setCartStore([]);
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
		<CartStoreContext.Provider value={{ removeAllItemsFromCart, addItemToCart, removeItemFromCart, items: cartStore }}>
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
