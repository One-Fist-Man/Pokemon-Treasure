import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { Store } from "@/types/types";
import { useCartStore } from "@/service/zustand";

export const Navbar = () => {
  const {
    number_of_carts,
    login,
    loginOn,
    cartList,
    AddLocalStorageToCartList,
    SetNumberOfCarts,
    loginOff,
  }: Store = useCartStore();

  useEffect(() => {
    if (cartList.length == 0) {
      const LoginAndLogout = localStorage
        ? JSON.parse(localStorage.getItem("login") as string)
        : 0;
      if (LoginAndLogout) loginOn();
      const items = localStorage
        ? JSON.parse(localStorage.getItem("cardData") as string)
        : [];
      if (items) {
        AddLocalStorageToCartList(items);
        SetNumberOfCarts(items.length);
      }
    }
  }, []);

  const logOutHandler = () => {
    loginOff();
    localStorage.setItem("login", JSON.stringify(login));
  };

  return (
    <div className="border-2 flex  basis-1/2 justify-center bg-red-600 ">
      <div className="text-white basis-1/2 flex justify-end">
        <div className="">
          <Link href="/">
            <Image
              src="/images/pokemon-tresure.png"
              width={570}
              height={10}
              alt="Pokemon"
            ></Image>
          </Link>
        </div>
      </div>
      <div className="flex basis-1/5 justify-end">
        <button onClick={() => router.push(`/sets/carts-list`)}>
          <div className=" rounded-lg font-bold text-white bg-red-500 hover:bg-gray-600 active:bg-gray-700  px-6 m-2">
            <div className="relative py-1">
              <div className="t-0 absolute left-4">
                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-blue-500 p-3 text-xs text-white">
                  {number_of_carts}
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="file: mt-4 h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
          </div>
        </button>
      </div>
      {login == 0 ? (
        <div>
          <Link href={`/sets/login`}>
            <button className=" rounded-lg font-bold text-white bg-gray-500 hover:bg-gray-600 active:bg-gray-700  p-4 m-3 ">
              Log In
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex">
          <div className=" rounded-lg font-bold text-white bg-red-500   p-4 m-3 ">
            CodeCamp
          </div>

          <button
            onClick={() => {
              logOutHandler();
            }}
            className=" rounded-lg font-bold text-white bg-gray-500 hover:bg-gray-600 active:bg-gray-700  p-4 m-3 "
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};
