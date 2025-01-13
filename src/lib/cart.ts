import { persisted } from 'svelte-persisted-store';
import { get } from 'svelte/store';

export interface CartItem {
	id: number;
	quantity: number;
}

export const cart = persisted<CartItem[]>('cart', []);

export const addToCart = (id: number): void => {
	const item = get(cart).find((item) => item.id === id);
	if (item) {
		cart.update((cart) => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			cart.find((item) => item.id === id)!.quantity += 1;
			return cart;
		});
	} else {
		cart.update((cart) => {
			cart.push({ id, quantity: 1 });
			return cart;
		});
	}
};
