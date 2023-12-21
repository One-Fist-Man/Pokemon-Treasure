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
  // AddLocalStorageToCartList:() => void;
};

export const useCartStore = create<Store>((set) => ({
  number_of_carts: 0,
  login: 0,
  cartList: [],

  loginOff: () => set({ login: 0 }),
  loginOn: () => set({ login: 1 }),

  incrementCarts: () =>
    set((state: { number_of_carts: number }) => ({
      number_of_carts: state.number_of_carts + 1,
    })),

  decrementCarts: () =>
    set((state: { number_of_carts: number }) => ({
      number_of_carts: state.number_of_carts - 1,
    })),

  removeAllCarts: () => set({ number_of_carts: 0 }),

  removeItem: (itemToRemove: any) =>
    set((state) => ({
      cartList: state.cartList.filter((item) => item.id !== itemToRemove.id),
    })),

  AddLocalStorageToCartList: (itemToAdd: any) => {
    return set((state) => ({
      cartList: itemToAdd,
    }));
  },
  AddToCart:  (itemToAdd: any) => {
    return set((state) => ({
      cartList: [...state.cartList, itemToAdd] ,
    }));
  },

  SetNumberOfCarts:  (cartsCount: any) => {
    return set((state) => ({
      number_of_carts: cartsCount ,
    }));
  },
}));
