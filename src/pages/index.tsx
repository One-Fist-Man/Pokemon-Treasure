import type { GetStaticProps, GetStaticPropsContext, PreviewData } from "next";
import { getAllPokemonCards } from "@/service/NetworkCalls";
import { CardList } from "@/components/Pokemon-Cards/CardsList";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { QueryKeys } from "@/enums/enums";
import { useSets } from "@/hooks";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { ParsedUrlQuery } from "querystring";

export const getStaticProps = (async (
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) => {
  // console.log('initial server');
  try {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: [QueryKeys.Sets],
      queryFn: async () => {
        const dataset = await getAllPokemonCards();
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
}) satisfies GetStaticProps<{}>;

const Home = () => {
  const { data } = useSets();
  const cards: Set[] | undefined = data;
  cards?.reverse();
  return (
    <main>
      <CardList cards={cards}></CardList>
    </main>
  );
};
export default Home;
