import { create } from "zustand";
type Store = {
  number_of_carts: number;
  incrementCarts: () => void;
  decrementCarts: () => void;
  removeAllCarts: () => void;
  cartList: any[];
  login: number;
  loginOff: () => void;
  loginOn: () => void;
};

export const useCartStore = create<Store>((set) => ({
  number_of_carts: 0,
  incrementCarts: () =>
    set((state: { number_of_carts: number }) => ({
      number_of_carts: state.number_of_carts + 1,
    })),
  decrementCarts: () =>
    set((state: { number_of_carts: number }) => ({
      number_of_carts: state.number_of_carts - 1,
    })),
  removeAllCarts: () => set({ number_of_carts: 0 }),
  cartList: [],
  login: 0,
  loginOff: () => set({ login: 1 }),
  loginOn: () => set({ login: 0 }),
  removeItem: (itemToRemove: any) =>
    set((state) => ({
      cartList: state.cartList.filter((item) => item.id !== itemToRemove.id),
    })),
}));
