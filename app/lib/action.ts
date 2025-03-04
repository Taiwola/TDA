"use server";

import {
  addToCart,
  CartItem,
  getSession,
  getSessionData,
  removeFromCart,
} from "@/app/lib/session";
import { revalidateTag } from "next/cache";

export const AddItemToCart = async (item: CartItem) => {
  try {
    const updatedCart = await addToCart(item);
    // Revalidate the 'cart' tag after adding an item
    revalidateTag("cart");
    return {
      success: true,
      cart: updatedCart,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      error: "Failed to add item to cart",
    };
  }
};

export const GetCart = async () => {
  try {
    // Tag this fetch with 'cart'
    const cart = await getSessionData("cart");
    return {
      success: true,
      cart: cart || [], // Return empty array if cart is undefined
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      error: "Failed to get cart",
    };
  }
};

export const removeFromItemCart = async (id: string) => {
  try {
    // Get the current session
    const currentSession = await getSession();

    // Ensure cart exists, if not, return early
    if (!currentSession.cart || currentSession.cart.length === 0) {
      return {
        success: true,
        cart: [],
        message: "Cart is already empty",
      };
    }

    // Filter out the item with the given id
    const updatedCart = removeFromCart(id);

    // Revalidate the 'cart' tag to ensure server-side cache is updated
    revalidateTag("cart");

    return {
      success: true,
      cart: updatedCart,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return {
      success: false,
      error: "Failed to remove item from cart",
    };
  }
};
