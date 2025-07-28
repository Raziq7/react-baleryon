import React, { useEffect, useState } from "react";
import axios from "axios";
import type { ProductDetailInterface } from "../../store/types/product";
import { ProductCard } from "../items/productCard";

function OurCollectionsProductList() {
  const [productList, setProductList] = useState([]);

  const fetchProductList = async function () {
    const response = await axios.get(
      `http://18.212.40.220/api/user/product/getProducts?page=${1}&limit=${10}`
    );
    setProductList(response.data.products);
  };
  
  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-x-16 gap-y-16 mx-auto w-full">
      {productList.map((product: ProductDetailInterface, ind) => (
        <ProductCard
          key={ind}
          prodctname={product.productName}
          prodctID={product._id}
          price={product.price}
          image={product.image[0]}
          productDetail={product}
        />
      ))}
    </div>
  );
}

export default OurCollectionsProductList;
