"use client";

import AddressForm from "@/components/items/AddressForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/store/store";
import { cn } from "../../lib/utils";
import { Locate } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store"; 

import {removeFromCartData } from "@/api/cartApi";
// import { addProductListToCart } from "@/store/features/cartSclice";
import { getCheckout, listAddress,
  oraderPaymentUpdate } from "@/api/checkoutApi";
import Script from "next/script";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CheckBoxLott from "@/components/lottie/CheckBoxLott";
import { fetchCartItemsThunk } from "@/store/thunks/cartThunks";

type Address = {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  number: string;
  id: string; 
};


interface AddressInterface {
  _id: string;
  userId: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  number: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}


declare global {
  interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: RazorpayPaymentResponse) => void;
    prefill: {
      name: string;
      email: string;
    };
    theme: {
      color: string;
    };
  }

  interface RazorpayInstance {
    open(): void;
  }

  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}


export interface Product {
  _id: string;
  price: number;
  productName: string;
  image: string;
}

function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { items} = useSelector(
    (state: RootState) => state.cart
  );

  const [isClient, setIsClient] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("0");
  const [couponCode, setCouponCode] = useState("");
  const [addressList, setAddressList] = useState<Array<AddressInterface>>([]);
  const [address, setAddress] = useState<Address>({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    number: "",
    id: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Cart calculations
  const delivery = 16.99;
  const discount = 0; // Adjust based on coupon
  const tax = 12.99;
  const subtotal =
    items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  const totalBeforeTax = subtotal + delivery - discount;
  const orderTotal = totalBeforeTax + tax;
  const totalSaving = 34.99;

  const handleAddressSubmit = (e: string) => {
    setDeliveryMethod(e);
    setAddress({
      name: addressList[parseInt(e)].name,
      street: addressList[parseInt(e)].street,
      city: addressList[parseInt(e)].city,
      state: addressList[parseInt(e)].state,
      zip: addressList[parseInt(e)].zip,
      number: addressList[parseInt(e)].number,
      id: ""
    });
  };

  // const removeAllProductFromCart = async () => {
  //   try {
  //     await clearCartData();
  //     // fetchCart();
  //   } catch (error) {
  //     console.error("Error removing product from cart:", error);
  //   }
  // };

  const handleSubmit = async () => {
    // Basic validation for address
    if (
      !address.name ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zip ||
      !address.number
    ) {
      setFormError("Please complete the address form before continuing.");
      return;
    }

    if (!items || items.length === 0) {
      setFormError("Your cart is empty. Please add items before checking out.");
      return;
    }

    setFormError(null); // Clear previous errors

    const prodList = items?.map((item) => {
      const product = typeof item.productId === 'string' ? null : item.productId;
    
      return {
        productId: product?._id || item._id,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: product?.price || item.price || 0, // fallback to 0 if none
      };
    });
    
    const res = await getCheckout(totalBeforeTax, "INR", address, prodList);
    console.log(res);
    const options = {
      key: "rzp_test_6gXYpAz9Ijk31I",
      amount: res.amount,
      currency: "INR",
      name: "The Baleryon",
      description: "Thank you for shopping with us!",
      order_id: res.id,
      handler: async function () {
        // setPaymentId(response.razorpay_payment_id);
        setDialogOpen(true);
        await oraderPaymentUpdate(res.id, "paid");
        setTimeout(() => {
          setDialogOpen(false);
          window.location.href = '/orderList';
        }, 2000);
        // dispatch(updateOrderPaymentAction(orderId, "paid"))
      },
      prefill: {
        name: address.name,
        email: address.number,
      },
      theme: {
        color: "#F37254",
      },
    };
    // const razorpay = new window?.Razorpay(options);
    // razorpay.open();// Add this at the top of your file

    if (typeof window !== 'undefined' && window.Razorpay) {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } else {
      console.error('Razorpay SDK not loaded');
    }

  };


  const fetchAddressList = async () => {
    try {
      const res = await listAddress();
      setAddressList(res);
      const first = res[0];
      setAddress({
        name: first.name,
        street: first.street,
        city: first.city,
        state: first.state,
        zip: first.zip,
        number: first.number,
        id: first._id,
      });
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const removeProductFromCart = async (productId: string) => {
    try {
      await removeFromCartData(productId);
      // fetchCart();
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      fetchAddressList();
      const fetchCart = async () => {
        dispatch(fetchCartItemsThunk());
      };
      fetchCart();
    }
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl">
        {formError && (
          <div className="text-red-600 bg-red-100 border border-red-200 px-3 py-2 rounded-md text-sm mt-2">
            {formError}
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-medium mb-4">Shipping address</h3>
            <div className="mb-8">
              <RadioGroup
                defaultValue="0"
                value={deliveryMethod}
                onValueChange={handleAddressSubmit}
                className="space-y-3"
              >
                {addressList?.map((e, i) => (
                  <div
                    key={e._id}
                    className={cn(
                      "flex items-center rounded-md border p-4",
                      deliveryMethod === i.toString()
                        ? "border-primary"
                        : "border-input"
                    )}
                  >
                    <RadioGroupItem
                      value={i.toString()}
                      id={i.toString()}
                      className="mr-4"
                    />
                    <div className="flex items-center gap-3 flex-1">
                      <Locate size={18} className="text-muted-foreground" />
                      <Label
                        htmlFor={i.toString()}
                        className="flex-1 cursor-pointer"
                      >
                        {e.name}, {e.street}, {e.city}, {e.state} {e.zip}
                      </Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="mb-8">
              <AddressForm address={address} setAddress={setAddress} />
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader className="pb-3">
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items?.map((item) => (
                    <div key={item?._id} className="flex justify-between">
                      <div className="flex items-start">
                        <span className="text-sm text-muted-foreground mr-2">
                          x {item.quantity}
                        </span>
                        <span className="text-sm">
  {typeof item.productId === "object"
    ? item.productId.productName
    : item.productName}
</span>

                      </div>
                      <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
  ₹ {typeof item.productId === 'object' ? item.productId.price : item.price}
</span>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            removeProductFromCart(
                              typeof item.productId === 'object' ? item?.productId?._id : item._id
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-muted-foreground"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>₹ {delivery.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span>₹ {discount.toFixed(2)}</span>
                  </div>
                  {/* <div className="flex justify-between mt-4">
                    <span>Total (exc tax)</span>
                    <span>₹ {orderTotal.toFixed(2)}</span>
                  </div> */}
                  <div className="flex justify-between">
                    <span>GST</span>
                    <span>₹ {orderTotal.toFixed(2)}</span>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between font-medium">
                    <span>Order Total</span>
                    <span>₹ {totalBeforeTax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md text-green-600 text-sm flex justify-between">
                  <span>Your total saving on this order:</span>
                  <span className="font-medium">
                    ₹ {totalSaving.toFixed(2)}
                  </span>
                </div>

                <div className="mt-4 flex space-x-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">Apply</Button>
                </div>
                <Button
                  type="submit"
                  className="bg-black mt-4 w-full"
                  onClick={handleSubmit}
                >
                  Confirm Payment ₹ {totalBeforeTax.toFixed(2)}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">Payment Confirmed</DialogTitle>
            <DialogDescription className="text-center">
              Your order has been successfully placed.
            </DialogDescription>
          </DialogHeader>
          <CheckBoxLott />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Page;
