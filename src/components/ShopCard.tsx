import { useMemo } from "react";
import type { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setBalance, setRefleshShoppingItems } from "../redux/appSlice";
import { toast } from "react-toastify";

const ShopCard = () => {
  const dispatch = useDispatch();
  const { shoppingItems, products, currentUser } = useSelector(
    (store: RootState) => store.app
  );

  // Ensure shoppingItems is always an array
  const items = Array.isArray(shoppingItems) ? shoppingItems : [];

  // Calculate total price
  const totalPrice = useMemo(() => {
    return items.reduce((acc, item) => {
      const product = products?.find((p) => p.id === item.item);
      return product ? acc + product.price * item.adet : acc;
    }, 0);
  }, [items, products]);

  // Purchase logic
  const configureShopElements = () => {
    if (!currentUser || typeof currentUser.balance !== "number") {
      toast.error("Kullanıcı bilgisi eksik veya bakiye tanımsız");
      return;
    }

    if (currentUser.balance >= totalPrice) {
      dispatch(setBalance(totalPrice));
      dispatch(setRefleshShoppingItems(""));
      toast.success("Satın alma başarılı");
    } else {
      toast.error("Yetersiz bakiye");
    }
  };

  return (
    <div className="w-full min-h-screen p-5 flex flex-col gap-4">
      {items.map((shopItem, index) => {
        const product = products?.find((p) => p.id === shopItem.item);
        if (!product) return null;

        return (
          <div key={`${product.id}-${index}`} className="flex flex-row gap-5">
            <div className="w-[100px] h-[125px] relative">
              <img
                className="w-[100px] h-[125px]"
                src={product.image}
                alt={product.title}
              />
              <p className="absolute top-10 left-4 text-2xl text-green-700">
                {product.price}$
              </p>
            </div>
            <div className="flex justify-center items-center gap-10">
              <span className="text-5xl">X</span>
              <span className="text-7xl">{shopItem.adet}</span>
              <span className="text-5xl">=</span>
              <span className="text-4xl">
                {Math.floor(product.price * shopItem.adet)}$
              </span>
            </div>
          </div>
        );
      })}

      <div className="flex flex-col items-center gap-1 mt-5">
        <div className="text-3xl">Toplam Tutar: {Math.floor(totalPrice)}$</div>
        <div className="text-yellow-700">
          Bakiye: {currentUser?.balance ?? "Tanımsız"}
        </div>
        <div className="text-yellow-700/50">
          Hesap Sahibi: {currentUser?.username ?? "Bilinmiyor"}
        </div>
      </div>

      {totalPrice !== 0 && (
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={configureShopElements}
            className="bg-slate-500 p-2 px-4 rounded-xl"
          >
            Sepeti Onayla
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopCard;
