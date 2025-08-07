import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import ProductDetailCard from "./ProductDetailCard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProductDetail = () => {
  const { products, currentProduct } = useSelector(
    (store: RootState) => store.app
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (currentProduct === null) {
      navigate("/home");
    }
  }, [currentProduct]);
  return (
    <div className="xl:px-[12rem] sm:pt-[12rem] pt-[5rem] bg-[url('/bg.jpg')] bg-cover bg-fixed bg-no-repeat min-h-screen">
      {products?.map((product) =>
        product.id === currentProduct ? <ProductDetailCard /> : null
      )}
    </div>
  );
};

export default ProductDetail;
