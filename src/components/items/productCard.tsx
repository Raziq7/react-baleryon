import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ProductDetailInterface } from "../../store/types/product";
import { useDispatch, useSelector } from "react-redux";
import { Heart,Trash } from "lucide-react";
import type { RootState } from "../../store/store";
import { toggleWishlistItem, initializeWishlist } from "../../store/slices/wishlistSlice";
import { addToWishlist } from "../../api/wishlistApi";


interface Props {
  prodctname: string;
  prodctID: string;
  price: number;
  image: string;
  productDetail: ProductDetailInterface;
}

const ProductCard: React.FC<Props> = ({ prodctname, prodctID, price, image }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full group">
      <div className="w-full flex justify-center items-center flex-col relative">
        <img width={236} height={367} src={image} alt="Product" />
        <div className="absolute bottom-0 w-full opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <button
            className="w-full py-4 text-white bg-black"
            onClick={() => navigate(`/products/product-details/${prodctID}`)}
          >
            View
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <p>{prodctname}</p>
        <p>₹ {price || "000"}</p>
      </div>
    </div>
  );
};

export default ProductCard;




interface Props {
  prodctname: string;
  prodctID: string;
  index: number;
  price: number;
  image: string;
  productDetail: ProductDetailInterface;
}

export const ProductCard2: React.FC<Props> = ({
  prodctname,
  prodctID,
  price,
  image,
  productDetail,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  useEffect(() => {
    dispatch(initializeWishlist());
  }, [dispatch]);

  const isInWishlist = wishlistItems.some(item => item._id === prodctID);

  const handleWishlistToggle = () => {
    dispatch(toggleWishlistItem(productDetail));
    addToWishlist(productDetail._id, productDetail.sizes, productDetail.color);
  };

  return (
    <div className="p-3 bg-white rounded shadow-md">
      <img src={image || "/cardProductImage.png"} alt="cardImage" className="w-full rounded mb-3" />
      <div className="flex justify-between">
        <p onClick={() => navigate(`/products/product-details/${prodctID}`)} className="cursor-pointer">{prodctname}</p>
        <button onClick={handleWishlistToggle}>
          {isInWishlist ? <Heart color="red" fill="red" /> : <Heart />}
        </button>
      </div>
      <p className="font-semibold">₹ {price}</p>
    </div>
  );
};




export const ProductListCard: React.FC<{ productDetail: ProductDetailInterface }> = ({ productDetail }) => {
  const navigate = useNavigate();

  return (
    <div className="shadow-lg rounded group">
      <div className="relative">
        <img src={productDetail.image[0]} alt="product" className="w-full h-auto" />
        <div className="absolute bottom-0 w-full opacity-0 translate-y-4 transition-all group-hover:opacity-100 group-hover:translate-y-0">
          <button className="w-full py-3 bg-black text-white" onClick={() => navigate(`/products/product-details/${productDetail._id}`)}>View Product</button>
        </div>
      </div>
      <div className="p-3">
        <div className="flex justify-between">
          <p>{productDetail.productName}</p>
          <p>₹ {productDetail.price}</p>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <p>2 colors</p>
          <p style={{ textDecoration: "line-through" }}>₹ {productDetail.discount}</p>
        </div>
      </div>
    </div>
  );
};


interface Props {
  productDetail: ProductDetailInterface;
  removeProduct: () => void;
}

export const WishListCard: React.FC<Props> = ({ productDetail, removeProduct }) => {
  const navigate = useNavigate();

  return (
    <div className="shadow-lg rounded group">
      <div className="relative">
        <button className="absolute top-3 right-3" onClick={removeProduct}>
          <Trash />
        </button>
        <img src={productDetail.image[0]} alt="wishlist" className="w-full h-auto" />
        <div className="absolute bottom-0 w-full opacity-0 group-hover:opacity-100 transition">
          <button
            className="w-full py-4 bg-black text-white"
            onClick={() => navigate(`/products/product-details/${productDetail._id}`)}
          >
            View
          </button>
        </div>
      </div>
      <div className="px-3 py-2">
        <div className="flex justify-between">
          <p>{productDetail.productName}</p>
          <p>₹ {productDetail.price}</p>
        </div>
      </div>
    </div>
  );
};
