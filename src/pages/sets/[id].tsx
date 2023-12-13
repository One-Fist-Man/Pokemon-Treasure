import { ChangeNameModal } from "@/components/Modal/ChangeNameModal";
import { QueryKeys } from "@/enums/enums";
import { useSets, useSetsByID } from "@/hooks";
import { getCardById } from "@/service/NetworkCalls";
import { useCartStore } from "@/service/zustand";
import { QueryClient, dehydrate, useQueryClient } from "@tanstack/react-query";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { useState } from "react";

export const getStaticPaths: GetStaticPaths = async (qry) => {
  const sets: PokemonTCG.Set[] = await PokemonTCG.getAllSets();
  const tempPaths = sets.map((x) => x.id);
  let tempParams: { params: { id: string } }[] = [];
  for (let i = 0; i < 5; i++) {
    tempParams.push({ params: { id: tempPaths[i] } });
  }
  return { paths: tempParams, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const id = context.params?.id;
  let data = {};
  try {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: [QueryKeys.Sets],
      queryFn: async () => {
        const dataset = await getCardById(id);
        return dataset;
      },
    });
    return { props: { dehydratedState: dehydrate(queryClient) } };
  } catch (e) {
    return {
      props: {},
      revalidate: 10,
    };
  }
};

const PokemonProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const { number_of_carts, incrementCarts, cartList } = useCartStore();

  const cardsData = useSets();
  const data: any = cardsData.data;

  const setCartData = () => {
    incrementCarts();
    cartList.push({
      name: data.name,
      images: data.images.logo,
      id: number_of_carts,
    });
  };

  if (data !== undefined) {
    return (
      <div className="flex justify-center p-8 rounded">
        <div className="border-2 p-4 text-center">
          <Image
            src={data?.images?.logo}
            alt={`${data.id} image`}
            width={300}
            height={300}
          />
          <button
            className="border-2 p-1 px-2  m-2 bg-red-400 text-white hover:bg-red-600 rounded-full"
            onClick={() => setCartData()}
          >
            Add TO Cart
          </button>
          <h5>
            <strong>ID: </strong>
            {data.id}
          </h5>

          <div className="flex items-center flex-col">
            <div className="flex">
              <h5 className="">
                <strong>Name: </strong>
                {data.name}
              </h5>
              <div>
                <button
                  className="mx-4 justify-self-center"
                  onClick={() => setOpenModal(true)}
                >
                  <svg
                    className="h-6 w-6 text-red-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />{" "}
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
            </div>

            {openModal && <ChangeNameModal array={[setOpenModal, data]} />}
          </div>
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
    );
  } else {
    return (
      <div className="grid h-screen place-content-center bg-white px-4">
        <h1 className="uppercase tracking-widest text-gray-500">
          404 | Not Found
        </h1>
      </div>
    );
  }
};

export default PokemonProfile;
