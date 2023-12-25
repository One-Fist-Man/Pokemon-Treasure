import { Icart, Store } from "@/types/types";
import { StoreApi, UseBoundStore, create } from "zustand";

export const useCartStore: UseBoundStore<StoreApi<Store>> = create<Store>(
  (set) => ({
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

    removeItem: (itemToRemove: Icart) =>
      set((state) => ({
        cartList: state.cartList.filter((item) => item.id !== itemToRemove.id),
      })),

    AddLocalStorageToCartList: (itemToAdd: Icart[]) => {
      return set((state) => ({
        cartList: itemToAdd,
      }));
    },
    AddToCart: (itemToAdd: Icart) => {
      return set((state) => ({
        cartList: [...state.cartList, itemToAdd],
      }));
    },

    SetNumberOfCarts: (cartsCount: number) => {
      return set((state) => ({
        number_of_carts: cartsCount,
      }));
    },
  })
);
