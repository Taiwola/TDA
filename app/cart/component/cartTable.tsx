import Image from "next/image";
import React, { SVGProps } from "react";

type CartItem = {
  title: string;
  quantity: number;
  price: number;
  image: string;
};

type Props = {
  cart: CartItem[];
  onQuantityChange: (index: number, newQuantity: number) => void;
};

export const SelectorIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <path d="M8 9l4 -4l4 4" />
      <path d="M16 15l-4 4l-4 -4" />
    </svg>
  );
};

export const CartTable = ({ cart, onQuantityChange }: Props) => {
  const quantityOptions = Array.from({ length: 10 }, (_, i) => ({
    key: (i + 1).toString(),
    label: (i + 1).toString(),
  }));

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full">
        <thead className="border-b">
          <tr className="">
            <th className="px-4 py-2 text-left">Item</th>
            <th className="px-4 py-2 text-center">Quantity</th>
            <th className="px-4 py-2 text-center">Price</th>
            <th className="px-4 py-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <tr key={index} className="border-b hover:bg-transparent">
                <td className="px-4 py-2">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={70}
                      height={70}
                    />
                    {item.title}
                  </div>
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex w-full max-w-xs flex-col gap-2">
                    {/* Custom select container */}
                    <div className="relative">
                      {/* Native HTML select element */}
                      <select
                        value={item.quantity.toString()}
                        onChange={
                          (e) => onQuantityChange(index, Number(e.target.value)) // Pass index and new quantity
                        }
                        className="appearance-none w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:border-burntgold"
                      >
                        {quantityOptions.map((option) => (
                          <option key={option.key} value={option.key}>
                            {option.label}
                          </option>
                        ))}
                      </select>

                      {/* Custom dropdown icon */}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 text-center">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center px-4 py-2 text-gray-500">
                Your cart is empty.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
