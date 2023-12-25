import { QueryKeys } from "@/enums/enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import React, { Dispatch, SetStateAction, useState } from "react";

export const ChangeNameModal = ({
  array,
}: {
  array: [Dispatch<SetStateAction<boolean>>, Set];
}) => {
  const data = array[1];
  const closeModal = array[0];

  const queryClient = useQueryClient();
  const [changedName, setChangedName] = useState<string>("");

  const changeTitle = async (card: PokemonTCG.Set) => {
    const newCard: Set = structuredClone(card);
    newCard.name = changedName;
    return newCard;
  };

  const mutation = useMutation({
    mutationFn: (card: PokemonTCG.Set) => {
      return changeTitle(card);
    },
    onSuccess: (card) => {
      queryClient.setQueryData([QueryKeys.Set], () => {
        return card;
      });
    },
  });

  const handelName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangedName(e.target.value);
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 "
      onClick={() => {
        closeModal(false);
      }}
    >
      <div
        className="bg-white fixed inset-x-1/3 inset-y-16 m-8"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          className=" m-8 border-2 py-2 px-4  bg-red-400 text-white hover:bg-red-600 rounded-full"
          onClick={() => {
            closeModal(false);
          }}
        >
          X
        </button>
        <div className="m-12  mx-20 border-2 border-blue-800 flex text-center p-4 ">
          <div className="flex items-center">
            <h5>
              <strong>Name: </strong>
              {data.name}
            </h5>
            <input
              className="border-2 mx-2"
              type="text"
              value={changedName}
              onChange={handelName}
            />
            <button
              className="border-2 rounded-full px-2 mx-2"
              onClick={() => mutation.mutate(data)}
            >
              Click
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
