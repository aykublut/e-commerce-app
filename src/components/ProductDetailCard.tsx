import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { setShoppingItems } from "../redux/appSlice";
import { useState } from "react";

const ProductDetailCard = () => {
  const { products, currentProduct } = useSelector(
    (store: RootState) => store.app
  );
  const dispatch = useDispatch();
  const sendTheseShopCard = () => {
    const payload = {
      item: currentProduct,
      adet: adet,
    };
    dispatch(setShoppingItems(payload));
  };
  const [adet, setAdet] = useState(0);
  const adetArttır = () => {
    setAdet(adet + 1);
  };
  const adetAzalt = () => {
    if (adet > 0) {
      setAdet(adet - 1);
    }
  };

  return (
    <div>
      {products?.map((product) =>
        product.id === currentProduct ? (
          <div className="w-full flex flex-col sm:flex-row">
            <div className="sm:w-[40%] w-[100%] max-sm:h-[27rem] items-center  p-3 border-b-4 flex justify-center shadow-2xl rounded-xl">
              <img
                className="sm:w-full w-[100%] sm:h-[29rem] h-[25rem] "
                src={product.image}
                alt=""
              />
            </div>
            <div className="sm:w-[60%] w-[100%] p-6 space-y-4">
              <h1 className="text-3xl font-extrabold text-gray-800">
                {product.title}
              </h1>

              <p className="text-lg text-gray-700 leading-relaxed">
                {product.description}
              </p>

              <h2 className="text-2xl font-bold text-green-700">
                ${product.price}
              </h2>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-yellow-500 font-semibold text-lg">
                  ⭐ {product.rating.rate}
                </span>
                <span className="text-sm text-gray-500">
                  ({product.rating.count} değerlendirme)
                </span>
              </div>
              <div className="w-full flex justify-between">
                <button
                  onClick={adetArttır}
                  className="text-5xl rounded-full bg-green-300 w-[40%] justify-center items-center pb-2"
                >
                  +
                </button>
                <div className="text-5xl  w-[20%] flex justify-center items-center ">
                  {adet}
                </div>
                <button
                  onClick={adetAzalt}
                  className="text-5xl rounded-full bg-red-300 w-[40%] justify-center items-center pb-2"
                >
                  -
                </button>
              </div>
              <div className="flex justify-center items-center">
                <button
                  onClick={sendTheseShopCard}
                  className="w-[30%] bg-slate-300 rounded-xl p-2"
                >
                  Sepete Ekle
                </button>
              </div>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default ProductDetailCard;
