"use client";

import React, { useEffect, useState } from "react";
import { ProductCard2 } from "../items/productCard";
import type { ProductDetailInterface } from "../../store/types/product";
import axios from "axios";

function NewArrivelprodctList() {
  const [productList, setProductList] = useState([]);

  const fetchProductList = async function () {
    const response = await axios.get(
      `http://localhost:8080/api/user/product/getProducts?page=${1}&limit=${10}`
    );
    setProductList(response.data.products);
  };

  useEffect(() => {
    fetchProductList();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-x-16 gap-y-16 mx-auto w-full">
      {productList.map((product : ProductDetailInterface, ind) => (
        <ProductCard2
          key={ind}
          index={ind}
          // isCheck={false}
          prodctname={product.productName}
          prodctID={product._id}
          price={product.price}
          image={product.image[0]}
          productDetail={product}
          // addtoWishList={(): void => addProductTowishlist(product as any)}
        />
      ))}
    </div>
  );
}

export default NewArrivelprodctList;
