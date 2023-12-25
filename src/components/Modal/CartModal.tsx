import { getCardById } from "@/service/NetworkCalls";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { QueryKeys } from "@/enums/enums";
import { useCartStore } from "@/service/zustand";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { Store } from "@/types/types";

export const CartModal = ({
  array,
}: {
  array: [Dispatch<SetStateAction<boolean>>, string];
}) => {
  const id = array[1];
  const closeModal = array[0];
  const { number_of_carts, incrementCarts, cartList, AddToCart }: Store =
    useCartStore();
  const queryClient = useQueryClient();

  const { data }: UseQueryResult<Set, Error> = useQuery({
    queryKey: [QueryKeys.Set],
    queryFn: async () => {
      const dataset = await getCardById(id);
      return dataset;
    },
  });

  const setCartData = () => {
    incrementCarts();
    AddToCart({
      name: data?.name,
      images: data?.images.logo,
      id: number_of_carts,
    });
  };

  useEffect(() => {
    localStorage.setItem("cardData", JSON.stringify(cartList));
  }, [cartList]);

  if (data == null)
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 ">
        <div className="bg-white fixed inset-x-1/3 inset-y-16 ">
          <div className="text-center h-1/2 flex flex-col justify-center  m-20">
            <div>loading</div>
          </div>
        </div>
      </div>
    );
  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 "
      onClick={() => {
        closeModal(false);
        queryClient.setQueryData([QueryKeys.Set], () => {
          return null;
        });
      }}
    >
      <div
        className="bg-white fixed inset-x-1/3 inset-y-16 "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          className="border-2 py-2 px-4 m-1 bg-red-400 text-white hover:bg-red-600 dark:text-gray-400  active:bg-red-600 rounded-full"
          onClick={() => {
            closeModal(false);
            queryClient.setQueryData([QueryKeys.Set], () => {
              return null;
            });
          }}
        >
          X
        </button>
        <div>
          <div className=" p-2 mx-4 bg-slate-300 hover:bg-slate-400 active:bg-slate-600 flex items-center justify-center rounded-md">
            <Image
              className=" p-2 mx-20 "
              src={data.images.logo}
              width={300}
              height={50}
              alt="Picture of Pokemon"
            />
          </div>
          <button
            className="border-2 py-2 px-4 m-1 bg-red-500  text-white hover:bg-red-600 active:bg-red-800 rounded-full"
            onClick={() => setCartData()}
          >
            Add TO Cart
          </button>
          <h5>
            <strong>ID: </strong>
            {data.id}
          </h5>
          <h5 className=" pt-2">
            <strong>Name: </strong>
            {data.name}
          </h5>
          <h5>
            <strong>Printed Total: </strong>
            {data.printedTotal}
          </h5>
          <h5>
            <strong>PtcgoCode: </strong>
            {data.ptcgoCode}
          </h5>
          <h5>
            <strong>Release Date: </strong>
            {data.releaseDate}
          </h5>
          <h5>
            <strong>Series: </strong>
            {data.series}
          </h5>
          <h5>
            <strong>Total: </strong>
            {data.total}
          </h5>
          <h5>
            <strong>Updated At: </strong>
            {data.updatedAt}
          </h5>
        </div>
      </div>
    </div>
  );
};
