/* eslint-disable @typescript-eslint/no-explicit-any */
// app/actions/session.ts
"use server";

import { cookies } from "next/headers";

export interface CartItem {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

export interface UserInfo {
  id: string;
  email: string;
  name?: string;
  role?: "admin" | "user" | string; // Added role field with possible values
}

export interface SessionData {
  cart?: CartItem[];
  user?: UserInfo;
  token?: string;
  [key: string]: any; // Allow for future extensions
}

// Base session operations
async function getSession(): Promise<SessionData> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  return session ? JSON.parse(session) : {};
}

async function setSession(data: SessionData) {
  const cookieStore = await cookies();
  cookieStore.set("session", JSON.stringify(data), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure in production
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

  // Type guard to check if value is a function
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

// Specific cart operations
export async function addToCart(item: CartItem) {
  return updateSession("cart", (currentCart = []) => {
    const existingItemIndex = currentCart.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    const newCart = [...currentCart];

    if (existingItemIndex > -1) {
      newCart[existingItemIndex].quantity += item.quantity;
    } else {
      newCart.push(item);
    }

    return newCart;
  });
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
export async function getSessionData<T extends keyof SessionData>(
  key: T
): Promise<SessionData[T]> {
  const session = await getSession();
  return session[key];
}

// Clear session
export async function clearSession() {
  await setSession({});
}
