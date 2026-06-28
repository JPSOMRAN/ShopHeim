import { useState } from "react";

import CartContext from "./CartContext";

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);

  // =============================
  // Add To Cart
  // =============================

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

  // =============================
  // Remove
  // =============================

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

  // =============================
  // Increase
  // =============================

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

  // =============================
  // Decrease
  // =============================

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

  // =============================
  // Clear Cart
  // =============================

  const clearCart = () => {

    setCartItems([]);

  };

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

}