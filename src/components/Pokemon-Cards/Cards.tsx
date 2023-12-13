import Link from "next/link";
import { CardDetails } from "./CardDetails";
import { CardImage } from "./CardImage";
import router from "next/router";

export const Cards = ({ card }: any) => {
  const { images, ...otherInfo } = card;
  return (
    <div >
      <Link
        href={`/sets/${otherInfo.id}`}
        onClick={() => router.push(`/sets/${otherInfo.id}`)}
      >
        <CardImage imageUrl={images}></CardImage>
      </Link>
      <CardDetails otherInfo={otherInfo}></CardDetails>
    </div>
  );
};
