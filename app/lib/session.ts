/* eslint-disable @typescript-eslint/no-explicit-any */
// app/actions/session.ts
"use server";

import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";

type ClothingSize = "M" | "L" | "XL" | "2XL";

// Define a single size's measurement structure
type Measurement = {
  Neck: number;
  Chest: number;
  back: number;
  Stomach: number;
  Hips: number;
  Trouser_waist: number;
  Thigh: number;
  Calf: number;
  Bottom: number;
};

// Full measurements record (all sizes) - optional if needed elsewhere
type Measurements = Record<ClothingSize, Measurement>;

export interface CartItem {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  measurement: Record<ClothingSize, Measurement>; // Changed to single size (still a Record for flexibility)
}

export interface CartItem {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  measurement: Measurements;
  color?: string;
}

export interface UserInfo {
  id: string;
  email: string;
  name?: string;
  role?: "admin" | "user" | string;
}

export interface SessionData {
  cart?: CartItem[];
  user?: UserInfo;
  token?: string;
  [key: string]: any;
}

// Base session operations
export async function getSession(): Promise<SessionData> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  return session ? JSON.parse(session) : {};
}

export async function setSession(data: SessionData) {
  const cookieStore = await cookies();
  cookieStore.set("session", JSON.stringify(data), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}

// Generic session update function
export async function updateSession<T extends keyof SessionData>(
  key: T,
  value:
    | SessionData[T]
    | ((current: SessionData[T] | undefined) => SessionData[T])
) {
  const currentSession = await getSession();
  const newValue =
    typeof value === "function"
      ? (value as (current: SessionData[T] | undefined) => SessionData[T])(
          currentSession[key]
        )
      : value;

  const updatedSession = { ...currentSession, [key]: newValue };
  await setSession(updatedSession);
  return updatedSession;
}

// Modified addToCart function
export async function addToCart(item: CartItem) {
  const currentSession = await getSession();

  // If no session exists or no cart in session, initialize with empty cart
  if (!currentSession.cart) {
    currentSession.cart = [];
  }

  const existingItemIndex = currentSession.cart.findIndex(
    (cartItem) => cartItem.id === item.id
  );
  const newCart = [...currentSession.cart];

  if (existingItemIndex > -1) {
    newCart[existingItemIndex].quantity += item.quantity;
  } else {
    newCart.push(item);
  }

  await setSession({ ...currentSession, cart: newCart });
  return newCart;
}

export async function removeFromCart(itemId: string) {
  return updateSession("cart", (currentCart = []) =>
    currentCart.filter((item) => item.id !== itemId)
  );
}

export async function updateCartItem(itemId: string, quantity: number) {
  return updateSession("cart", (currentCart = []) => {
    const newCart = [...currentCart];
    const itemIndex = newCart.findIndex((item) => item.id === itemId);

    if (itemIndex > -1) {
      if (quantity <= 0) {
        newCart.splice(itemIndex, 1);
      } else {
        newCart[itemIndex].quantity = quantity;
      }
    }

    return newCart;
  });
}

// User operations
export async function setUser(user: UserInfo | null) {
  return updateSession("user", user as UserInfo);
}

// Token operations
export async function setToken(token: string | null) {
  return updateSession("token", token as string);
}

// Get specific session data

// Cached function that takes session data as an argument
const getSessionDataCached = unstable_cache(
  async <T extends keyof SessionData>(
    key: T,
    session: SessionData
  ): Promise<SessionData[T]> => {
    return session[key];
  },
  ["session-data"], // Cache key
  { tags: ["cart"] } // Tags for revalidation
);

// Cached getSessionData with tags
export async function getSessionData<T extends keyof SessionData>(
  key: T
): Promise<SessionData[T]> {
  const session = await getSession(); // Fetch dynamic data outside cache
  return getSessionDataCached(key, session); // Pass it to cached function
}
// Clear session
export async function clearSession() {
  await setSession({});
}
