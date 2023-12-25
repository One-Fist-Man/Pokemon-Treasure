import { useCartStore } from "@/service/zustand";
import router from "next/router";
import { useEffect } from "react";

const LogIn = () => {
  const { login, loginOn } = useCartStore();

  const handelSubmit = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    loginOn();
    router.push("/");
  };

  useEffect(() => {
    localStorage.setItem("login", JSON.stringify(login));
  }, [login]);

  return (
    // <div className="flex items-center">
      <div className="flex items-center flex-col">
        <h1 className="font-bold">logIn</h1>
        <div className="border-2 border-blue-800 h-80 w-80 flex items-center p-12">
          <form className=" w-2" onSubmit={()=>handelSubmit}>
            <label className="font-bold mx-2">Name:</label>
            <input className="border-2 m-2" type="text" required />
            <br />
            <label className="font-bold mx-2 ">Password:</label>
            <input className="border-2 m-2" type="Password" required />
            <input
              type="submit"
              value="Submit"
              className="border-2 m-2 px-1 font-bold rounded"
            />
          </form>
        </div>
      </div>
    // </div>
  );
};

export default LogIn;
