import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { getAllPokemonCards } from "@/service/NetworkCalls";
import { CardList } from "@/components/Pokemon-Cards/CardsList";

export const getStaticProps = (async (context) => {
  const cards = await getAllPokemonCards();
  return { props: { cards } };
}) satisfies GetStaticProps<{}>;

const Home = ({ cards }: InferGetStaticPropsType<typeof getStaticProps>) => {
  cards.reverse();

  return (
    <main>
      <CardList cards={cards}></CardList>
    </main>
  );
};
export default Home;
