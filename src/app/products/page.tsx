import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Checkbox } from "../../components/ui/checkbox";
import { ProductListCard } from "../../components/items/productCard";
import type { ProductDetailInterface } from "../../store/types/product";
import api from "../../utils/baseUrl"; // <-- Ensure this is correctly set up

function ShopPage() {
  const [productList, setProductList] = useState<ProductDetailInterface[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const toggleFilter = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setState((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    const fetchProductList = async () => {
      const query = new URLSearchParams();
      query.append("page", "1");
      query.append("limit", "10");

      if (selectedCategories.length > 0) {
        query.append("category", selectedCategories.join(","));
      }

      if (selectedColors.length > 0) {
        query.append("color", selectedColors.join(","));
      }

      try {
        const response = await api.get(
          `/api/user/product/getProducts?${query.toString()}`
        );
        setProductList(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductList();
  }, [selectedCategories, selectedColors]);

  const renderCheckbox = (
    label: string,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={label}
        checked={state.includes(label)}
        onCheckedChange={() => toggleFilter(label, setState)}
      />
      <label
        htmlFor={label}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );

  return (
    <div className="px-4 md:px-8">
      <div className="mt-6 md:mt-10 mb-12 md:mb-18 text-center">
        <h2 className="text-2xl md:text-3xl">SHOP BY CATEGORIES</h2>
        <p className="text-[#7A7879] text-sm md:text-base">
          our new cozy collection is made for you
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <div className="border border-[#C7C7C7] rounded p-3 w-full md:w-[350px] mb-6 md:mb-0">
          <Accordion type="single" collapsible>
            <AccordionItem value="category">
              <AccordionTrigger className="text-base md:text-lg">
                Category
              </AccordionTrigger>
              <AccordionContent>
                <ol className="flex flex-col gap-2">
                  {["Shirt", "Jacket", "T-shirt", "Hoodie"].map((cat) => (
                    <li key={cat}>
                      {renderCheckbox(
                        cat.toLowerCase(),
                        selectedCategories,
                        setSelectedCategories
                      )}
                    </li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="color">
              <AccordionTrigger className="text-base md:text-lg">
                Color
              </AccordionTrigger>
              <AccordionContent>
                <ol className="flex flex-col gap-2">
                  {["Red", "Blue", "Black", "Green", "White"].map((color) => (
                    <li key={color}>
                      {renderCheckbox(
                        color.toUpperCase(),
                        selectedColors,
                        setSelectedColors
                      )}
                    </li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-x-10 md:gap-y-16">
            {productList.map((productDetail, i) => (
              <ProductListCard key={i} productDetail={productDetail} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
