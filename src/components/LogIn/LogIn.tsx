import { useCartStore } from "@/service/zustand";
import router from "next/router";
import Footer from "../Footer/Footer";

const LogIn = () => {
  const { loginOff } = useCartStore();

  const handelSubmit = (e: any) => {
    e.preventDefault();
    loginOff();
    router.push("/");
  };

  return (
    <div className=" w-full flex items-center">
      <div className=" w-full flex items-center flex-col">
        <h1 className="font-bold">logIn</h1>

        <div className="border-2 border-blue-800 h-80 w-80 flex items-center p-12">
          <form className=" w-2" onSubmit={handelSubmit}>
            <label className="font-bold mx-2">Name:</label>
            <input className="border-2 m-2" type="text" />
            <br />
            <label className="font-bold mx-2 ">Password:</label>
            <input className="border-2 m-2" type="Password" />
            <input type="submit" value="Submit" className="border-2 m-2 px-1 font-bold rounded" />
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LogIn;
