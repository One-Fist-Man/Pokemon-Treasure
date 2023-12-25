import { ChangeNameModal } from "@/components/Modal/ChangeNameModal";
import { QueryKeys } from "@/enums/enums";
import { useSetsByID } from "@/hooks";
import { getAllPokemonCards, getCardById } from "@/service/NetworkCalls";
import { useCartStore } from "@/service/zustand";
import { Store } from "@/types/types";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  PreviewData,
} from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";

export const getStaticPaths: GetStaticPaths = async (qry) => {
  const sets: PokemonTCG.Set[] = await getAllPokemonCards();
  // console.log("getStaticPaths");
  const tempPaths = sets.map((x) => x.id);
  let tempParams: { params: { id: string } }[] = [];
  for (let i = 0; i < 5; i++) {
    tempParams.push({ params: { id: tempPaths[i] } });
  }
  return { paths: tempParams, fallback: true };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) => {
  // console.log("dynamic server getStaticProps");
  const id = context.params?.id;
  let data = {};
  try {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: [QueryKeys.Set],
      queryFn: async () => {
        const dataset = await getCardById(id as string);
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
  const { number_of_carts, incrementCarts, cartList, AddToCart }: Store =
    useCartStore();

  const router = useRouter();
  const id = router.query.id;
  const { data ,error} = useSetsByID(id as string);
  const Alldata: Set | undefined = data;

  const setCartData = () => {
    incrementCarts();
    AddToCart({
      name: Alldata?.name,
      images: Alldata?.images.logo,
      id: number_of_carts,
    });
  };
  useEffect(() => {
    localStorage.setItem("cardData", JSON.stringify(cartList));
  }, [cartList]);
  // console.log(Alldata);
  if (Alldata !== undefined) {
    return (
      <div className="min-h-[calc(100vh-140px)]">
        <div className="flex justify-center p-8 rounded">
          <div className="border-2 p-4 text-center">
            <Image
              src={Alldata?.images?.logo}
              alt={`${Alldata.id} image`}
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
              {Alldata.id}
            </h5>

            <div className="flex items-center flex-col">
              <div className="flex">
                <h5 className="">
                  <strong>Name: </strong>
                  {Alldata.name}
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />{" "}
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </div>
              </div>

              {openModal && <ChangeNameModal array={[setOpenModal, Alldata]} />}
            </div>
            <h5>
              <strong>Printed Total: </strong>
              {Alldata.printedTotal}
            </h5>
            <h5>
              <strong>PtcgoCode: </strong>
              {Alldata.ptcgoCode}
            </h5>
            <h5>
              <strong>Release Date: </strong>
              {Alldata.releaseDate}
            </h5>
            <h5>
              <strong>Series: </strong>
              {Alldata.series}
            </h5>
            <h5>
              <strong>Total: </strong>
              {Alldata.total}
            </h5>
            <h5>
              <strong>Updated At: </strong>
              {Alldata.updatedAt}
            </h5>
          </div>
        </div>
      </div>
    );
  } else if(error) {
    return (
      <div className="grid place-content-center bg-white px-4 min-h-[calc(100vh-140px)]">
        <h1 className="uppercase tracking-widest text-gray-500">
          404 | Not Found
        </h1>
      </div>
    );
  }
  else {
    return (
      <div className="grid place-content-center bg-white px-4 min-h-[calc(100vh-140px)]">
        <h1 className="uppercase tracking-widest text-gray-500">
          Loading...
        </h1>
      </div>
    );
  }
};

export default PokemonProfile;
