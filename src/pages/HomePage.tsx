import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setLoading, setProducts } from "../redux/appSlice";
import type { userType } from "../Types/Types";
import axios from "axios";
import type { RootState } from "../redux/store";
import Product from "../components/Product";

const HomePage = () => {
  const { products, currentCategory, inputFilter } = useSelector(
    (store: RootState) => store.app
  );

  const myFunc = () => {
    const result = localStorage.getItem("currentUser");
    if (result) {
      const payload: userType = JSON.parse(result) as userType;
      dispatch(setCurrentUser(payload));
    }
  };
  const dispatch = useDispatch();
  const getAllProducts = async () => {
    dispatch(setLoading(true));
    const response: any = await axios.get("https://fakestoreapi.com/products");
    const payload = response.data;
    console.log(payload);
    dispatch(setProducts(payload));
    dispatch(setLoading(false));
  };

  useEffect(() => {
    myFunc();
    getAllProducts();
  }, []);
  return (
    <div className="flex min-h-screen justify-center gap-10 flex-wrap xl:px-[12rem] pt-[12rem] bg-[url('/bg.jpg')] bg-cover bg-fixed bg-no-repeat ">
      {products?.map((product) =>
        currentCategory === null &&
        product.title.toLowerCase().includes(inputFilter) ? (
          <Product
            key={product.id}
            id={product.id}
            rating={product.rating}
            price={product.price}
            title={product.title}
            image={product.image}
            description={product.description}
            category={product.category}
          />
        ) : product.category === currentCategory ? (
          <Product
            key={product.id}
            id={product.id}
            rating={product.rating}
            price={product.price}
            title={product.title}
            image={product.image}
            description={product.description}
            category={product.category}
          />
        ) : null
      )}
    </div>
  );
};

export default HomePage;
