import Image from "next/image";

export const CardImage = ({ imageUrl }:{imageUrl:{logo:string,symbol:string}}) => {
  let imgUrl = "";
  try {
    imgUrl = imageUrl.logo;
  } catch (err) {
    imgUrl = "";
  }
  const x = "/images/pokemon-tresure.png";

  return (
    <div className="p-2 m-2 bg-slate-300 hover:bg-slate-400 active:bg-slate-600 h-96 flex items-center  rounded-md">
      <div className="m-16">
      <Image src={imgUrl ?? x} width={570} height={10} alt="Pokemon"></Image>
      </div>
    </div>
  );
};
