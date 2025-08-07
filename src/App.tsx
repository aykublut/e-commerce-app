import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import RouterConfig from "./config/RouterConfig";
import { ToastContainer } from "react-toastify";
import type { RootState } from "./redux/store";
import ShopCard from "./components/ShopCard";

function App() {
  const { products, currentUser, loading, shoppingBar } = useSelector(
    (store: RootState) => store.app
  );
  return (
    <div className="relative w-full">
      <div
        className={
          shoppingBar
            ? "w-[30%] h-full absolute z-[100] right-0 bg-slate-400"
            : "hidden w-0 "
        }
      >
        <ShopCard />
      </div>
      <div className="absolute w-full">
        {products !== null && currentUser && loading === false ? (
          <Navbar />
        ) : (
          <p></p>
        )}
      </div>
      <RouterConfig />
      <ToastContainer autoClose={2000} />
      <Spinner />
    </div>
  );
}

export default App;
