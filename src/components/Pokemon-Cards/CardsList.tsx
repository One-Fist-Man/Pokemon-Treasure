import { Cards } from "./Cards";

export const CardList = ({ cards }: any) => {
  return (
    <>
    <div className="grid grid-cols-4 grid-flow-row gap-4 text-center  ">
      {cards.map((card: any) => (
        <Cards card={card}/>
      ))}
    </div>
    </>
  );
};
