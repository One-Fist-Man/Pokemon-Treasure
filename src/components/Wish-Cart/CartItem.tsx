import { useCartStore } from "@/service/zustand";

const CartItem = ({ cart }: any) => {
  const { removeItem, decrementCarts }: any = useCartStore();

  const handelRemove = (data: any) => {
    removeItem(data);
    decrementCarts();
  };

  return (
    <div className="flex items-center border-2">
      <hr />
      <div className="p-4 w-1/3">
        <div className="w-full h-96 md:h-24 md:w-24">
          <img src={cart.images} alt="{id}" width={100} height={50} />
        </div>
      </div>
      <div className="w-1/3 px-4">
        <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
          {cart.name}
        </h2>
      </div>
      <div className="p-12">
        <h2
          className="mb-2 text-xl font-bold dark:text-gray-400 hover:bg-gray-500 active:bg-gray-600 border-2 rounded-full px-2"
          onClick={() => handelRemove(cart)}
        >
          X
        </h2>
      </div>
    </div>
  );
};

export default CartItem;
