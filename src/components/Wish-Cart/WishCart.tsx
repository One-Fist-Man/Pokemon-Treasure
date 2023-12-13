import { useCartStore } from "@/service/zustand";
import CartItem from "./CartItem";

const WishCart = () => {
  const { cartList } = useCartStore();

  return (
    <div className="border-2">
      <div className="flex items-center ">
        <div className="px-4 w-1/3">
          <div className="w-2/3 px-4">
            <h2 className="mb-2 text-xl font-bold dark:text-gray-400">Items</h2>
          </div>
        </div>
        <div className="w-1/3 px-4">
          <h2 className="text-xl font-bold dark:text-gray-400">Name</h2>
        </div>
        <div className="">
          <h2 className=" text-xl font-bold dark:text-gray-400">
            Remove Items
          </h2>
        </div>
      </div>
      <hr />
      <div className="">
        {cartList.length == 0 ? (
          <div className="font-bold h-screen text-center py-8">
            No items in cart yet.
          </div>
        ) : (
          <div className="">
            {cartList.map((curElem) => {
              return <CartItem cart={curElem} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishCart;
