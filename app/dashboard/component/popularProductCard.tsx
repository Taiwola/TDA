import { Button } from "@heroui/react";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import React from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  quantity: number;
};

type Props = {
  product: Product; // Pass the product data as a prop
};

export const PopularProductCard = ({ product }: Props) => {
  return (
    <div
      key={product.id}
      className="flex items-center gap-3 px-5 py-7 border-b justify-between"
    >
      <div className="flex items-center gap-3">
        <Image
          src={product.image}
          alt={product.name}
          width={30}
          height={30}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div className="flex flex-col justify-between gap-1">
          <p className="font-medium text-gray-700">{product.name}</p>
          <div className="flex text-sm items-center">
            <span className="font-bold text-burntgold text-xs">
              {product.price}
            </span>
          </div>
        </div>
      </div>
      <div className="flex text-xs items-center">
        <Button className="p-2 rounded-full bg-burntgold text-white mr-2">
          <ShoppingBag className="w-4 h-4" />
        </Button>
        {Math.round(product.quantity / 1000)}k sold
      </div>
    </div>
  );
};
