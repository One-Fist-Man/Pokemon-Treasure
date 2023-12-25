import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { Cards } from "./Cards";

export const CardList = ({ cards }: {cards:Set[]| undefined}) => {
  return (
    <div className="grid grid-cols-4 grid-flow-row gap-4 text-center  ">
      {cards?.map((card: Set) => (
        <Cards card={card} key={card.id} />
      ))}
    </div>
  );
};
