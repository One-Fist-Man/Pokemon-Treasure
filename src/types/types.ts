import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { StoreApi, UseBoundStore } from "zustand";

export type StoreType = UseBoundStore<StoreApi<StoreApi<Store>>>;
export interface IAddCart {
  name: string | undefined;
  images: object;
  id: number | undefined;
}
export interface Store {
  number_of_carts: number;
  incrementCarts: () => void;
  decrementCarts: () => void;
  removeAllCarts: () => void;
  cartList: Icart[];
  login: number;
  loginOff: () => void;
  loginOn: () => void;
  AddLocalStorageToCartList: (itemToAdd: Icart[]) => void;
  SetNumberOfCarts: (cartsCount: number) => void;
  AddToCart: (itemToAdd: Icart) => void;
  removeItem: (itemToRemove: Icart) => void;
}

export interface IotherInfo {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: object;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
}

export interface Icart {
  id: number;
  name: string | undefined;
  images: string | undefined;
}
