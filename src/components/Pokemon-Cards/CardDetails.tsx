import { useState } from "react";
import { CartModal } from "../Modal/CartModal";

export const CardDetails = ({ otherInfo }: any) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="px-2 mx-2 pb-2 mb-2 bg-blue-100  rounded">
      <button
        className="p-1 px-2  text-white  bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-full"
        onClick={() => setOpenModal(true)}
      >
        Quick View
      </button>
      {openModal && <CartModal array={[setOpenModal, otherInfo.id]} />}
      <h5 className=" pt-2">
        <strong>Name: </strong>
        {otherInfo.name}
      </h5>
      <h5>
        <strong>Printed Total: </strong>
        {otherInfo.printedTotal}
      </h5>
      <h5>
        <strong>Series: </strong>
        {otherInfo.series}
      </h5>
      <h5>
        <strong>Total: </strong>
        {otherInfo.total}
      </h5>
    </div>
  );
};
