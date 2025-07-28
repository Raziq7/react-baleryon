import React, { useEffect, useState } from "react";
import type {ProductDetail}  from "../../store/types/product.ts";
import { ProductCard2 } from "../items/productCard";
import LoaderLottie from "../lottie/Loader";

// ----------- NewArrivelprodctList Component --------------

const NewArrivelprodctList: React.FC = () => {
  const [productList, setProductList] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  const apiBaseUrl = "http://localhost:8080";

  const fetchProductList = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${apiBaseUrl}/api/user/product/getProducts?page=1&limit=10`
      );
      setLoading(false);
      const data = await response.json();
      setProductList(data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-x-16 gap-y-16 mx-auto w-full">
      {loading && <LoaderLottie />}
      {productList.map((product, ind) => (
        <ProductCard2
          key={product._id}
          index={ind}
          prodctname={product.productName}
          prodctID={product._id}
          price={product.price}
          image={product.image[0]}
          productDetail={product}
        />
      ))}
    </div>
  );
};

export default NewArrivelprodctList;
