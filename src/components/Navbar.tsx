import { useDispatch, useSelector } from "react-redux";
import maymun from "../images/ceasar.png";
import { ImExit } from "react-icons/im";
import { FaBasketShopping } from "react-icons/fa6";

import {
  setCurrentCategory,
  setCurrentUser,
  setInputFilter,
  setLoading,
  setShoppingBar,
} from "../redux/appSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import type { RootState } from "../redux/store";

const Navbar = () => {
  const { inputFilter, shoppingBar } = useSelector(
    (store: RootState) => store.app
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    dispatch(setCurrentUser(null));
    localStorage.setItem("currentUser", "");
    toast.success("Çıkış yapıldı");
    dispatch(setLoading(true));
    await new Promise((resolve) => setTimeout(resolve, 200));
    dispatch(setLoading(false));
    navigate("/login");
  };
  const handleHover = (item: string | any) => {
    dispatch(setCurrentCategory(item));
  };
  const location = useLocation();
  const [menuActive, setMenuActive] = useState<boolean>(true);
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const configureShopBar = () => {
    dispatch(setShoppingBar(!shoppingBar));
  };
  useEffect(() => {
    if (location.pathname === "/productDetail") {
      setMenuActive(false);
    }
  }, [location]);
  useEffect(() => {
    if (location.pathname !== "/home") {
      setMenuActive(false);
      setReadOnly(true);
    } else {
      setReadOnly(false);
      setMenuActive(true);
    }
    if (inputFilter.length > 0) {
      setMenuActive(false);
    }
  }, [location, inputFilter]);
  return (
    <div className="relative xl:mx-[12rem] lg:mx-[1rem] md:mx-[0rem] py-2 px-5 shadow-md  bg-slate-400 rounded-b-md border-b-2 border-black flex justify-between">
      <div
        className={
          menuActive
            ? "w-[100%]  sm:w-0 flex justify-center items-center sm:hidden absolute z-50 top-[8rem] left-0"
            : "hidden w-0 h-0"
        }
      >
        <input
          type="text"
          placeholder="bir şeyler arat..."
          className="placeholder:text-black lg:w-[300px] w-[220px] lg:h-[3rem] h-[2rem] bg-slate-400 border-b border-black rounded-md outline-none px-3 py-1 lg:text-2xl text-md font-light tracking-tight italic"
        />
      </div>
      <div
        onClick={() => navigate("/home")}
        className="w-[45%] flex gap-6 pl-3 cursor-pointer items-center "
      >
        <img
          src={maymun}
          className="sm:w-[100px] sm:h-[100px] h-[0px] w-[0px] rounded-2xl"
          alt=""
        />
        <h1 className="mb-1 lg:text-5xl md:text-4xl text-2xl font-light tracking-tight text-left text-gray-800 leading-snug">
          Maymun<span className="text-blue-500 ">Yol</span>
        </h1>
        <FaBasketShopping
          onClick={configureShopBar}
          className="text-green-800 md:text-3xl text-xl cursor-pointer"
        />
      </div>
      <div
        className={
          menuActive
            ? "absolute w-full  h-[4rem] bottom-[-59px] py-5 z-50 bg-slate-600 right-0 rounded-b-xl flex justify-around text-white"
            : "hidden w-0 h-0"
        }
      >
        <h3
          className="cursor-pointer w-[20%] flex justify-center items-center max-sm:text-[12px]"
          onMouseEnter={() => handleHover("men's clothing")}
        >
          men's clothing
        </h3>
        <h3
          className="cursor-pointer w-[20%] flex justify-center items-center max-sm:text-[12px]"
          onMouseEnter={() => handleHover("women's clothing")}
        >
          women's clothing
        </h3>
        <h3
          className="cursor-pointer w-[20%] flex justify-center items-center max-sm:text-[12px]"
          onMouseEnter={() => handleHover(null)}
        >
          All
        </h3>
        <h3
          className="cursor-pointer w-[20%] flex justify-center items-center max-sm:text-[12px] "
          onMouseEnter={() => handleHover("jewelery")}
        >
          jewelery
        </h3>
        <h3
          className="cursor-pointer w-[20%] flex justify-center items-center max-sm:text-[12px]"
          onMouseEnter={() => handleHover("electronics")}
        >
          electronics
        </h3>
      </div>
      <div className="w-[10%] flex justify-center items-end sm:pb-5 pb-1 cursor-pointer md:hidden ">
        <GiHamburgerMenu
          onClick={() => setMenuActive(!menuActive)}
          className="text-5xl  bottom-[-15px]"
        />
      </div>
      <div className="w-[45%] flex lg:gap-8 gap-2 items-center relative justify-end ">
        <input
          value={inputFilter}
          onChange={(e) => {
            dispatch(setInputFilter(e.target.value));
            handleHover(null);
          }}
          type="text"
          readOnly={readOnly}
          placeholder={
            readOnly ? "burda arama yapamazsın" : "bir şeyler arat..."
          }
          className="placeholder:text-black lg:w-[300px] w-[220px] lg:h-[3rem] h-[2rem] bg-slate-400 border-b border-black rounded-md outline-none px-3 py-1 lg:text-2xl text-md font-light tracking-tight italic mr-3  hidden sm:block"
        />

        <ImExit
          onClick={logout}
          className="text-red-800 md:text-3xl text-xl cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
