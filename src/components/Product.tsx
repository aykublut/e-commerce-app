import { useNavigate } from "react-router-dom";
import type { productType } from "../Types/Types";
import { useDispatch } from "react-redux";
import { setCurrentProduct } from "../redux/appSlice";

const Product = ({ id, image, price, title }: productType) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleProductDetail = () => {
    dispatch(setCurrentProduct(id));
    navigate("/productDetail");
  };
  return (
    <div
      onClick={handleProductDetail}
      className="w-[250px] pb-3 h-[300px]  flex flex-col gap-3 rounded-xl border-t-[4px] border-b-[1px] border-x-[1px]  bg-white/10 cursor-pointer hover:bg-gray-600/80 items-center relative"
    >
      <img src={image} className="w-[90%] mt-3 h-[270px]" alt="" />
      <div className="flex rounded-xl flex-col absolute  justify-center h-full w-[100%]  bg-gray-500/40 ">
        <div className="text-center italic font-extrabold tracking-wider text-white drop-shadow-md transition-all duration-300 hover:text-purple-300">
          {title}
        </div>
        <div className="text-2xl font-bold text-green-300 text-center mt-2 drop-shadow-sm transition-all duration-300 hover:scale-105">
          {price}$
        </div>
      </div>
    </div>
  );
};

export default Product;
