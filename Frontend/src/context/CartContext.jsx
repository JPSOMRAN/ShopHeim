/*import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);

  // ===============================
  // Add To Cart
  // ===============================

  const addToCart = (product, size = "M") => {

    const existingItem = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.size === size
    );

    if (existingItem) {

      setCartItems(

        cartItems.map((item) =>

          item.id === product.id &&
          item.size === size

            ? {
                ...item,
                quantity: item.quantity + 1,
              }

            : item

        )

      );

    } else {

      setCartItems([

        ...cartItems,

        {
          ...product,
          size,
          quantity: 1,
        },

      ]);

    }

  };

  // ===============================
  // Remove From Cart
  // ===============================

  const removeFromCart = (id, size) => {

    setCartItems(

      cartItems.filter(

        (item) =>

          !(

            item.id === id &&
            item.size === size

          )

      )

    );

  };

  // ===============================
  // Increase Quantity
  // ===============================

  const increaseQuantity = (id, size) => {

    setCartItems(

      cartItems.map((item) =>

        item.id === id &&
        item.size === size

          ? {
              ...item,
              quantity: item.quantity + 1,
            }

          : item

      )

    );

  };

  // ===============================
  // Decrease Quantity
  // ===============================

  const decreaseQuantity = (id, size) => {

    setCartItems(

      cartItems.map((item) =>

        item.id === id &&
        item.size === size &&
        item.quantity > 1

          ? {
              ...item,
              quantity: item.quantity - 1,
            }

          : item

      )

    );

  };

  // ===============================
  // Clear Cart
  // ===============================

  const clearCart = () => {

    setCartItems([]);

  };

  // ===============================
  // Provider
  // ===============================

  return (

    <CartContext.Provider

      value={{

        cartItems,

        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        clearCart,

      }}

    >

      {children}

    </CartContext.Provider>

  );

}*/

import { createContext } from "react";

const CartContext = createContext();

export default CartContext;