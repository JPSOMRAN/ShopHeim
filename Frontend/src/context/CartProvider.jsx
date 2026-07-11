import { useState, useEffect } from "react";
import CartContext from "./CartContext";

export function CartProvider({ children }) {

  // =============================
  // Load Cart From LocalStorage
  // =============================

  const [cartItems, setCartItems] = useState(() => {

    const savedCart = localStorage.getItem("cartItems");

    return savedCart ? JSON.parse(savedCart) : [];

  });

  // =============================
  // Save Cart To LocalStorage
  // =============================

  useEffect(() => {

    localStorage.setItem(

      "cartItems",

      JSON.stringify(cartItems)

    );

  }, [cartItems]);

  // =============================
  // Add To Cart
  // =============================

  const addToCart = (product, size = "M") => {

    const existingItem = cartItems.find(

      (item) =>

        item._id === product._id &&

        item.size === size

    );

    if (existingItem) {

      setCartItems(

        cartItems.map((item) =>

          item._id === product._id &&

          item.size === size

            ? {

                ...item,

                quantity: item.quantity + 1,

              }

            : item

        )

      );

    }

    else {

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
  // Remove Item
  // =============================

  const removeFromCart = (_id, size) => {

    setCartItems(

      cartItems.filter(

        (item) =>

          !(

            item._id === _id &&

            item.size === size

          )

      )

    );

  };

  // =============================
  // Increase Quantity
  // =============================

  const increaseQuantity = (_id, size) => {

    setCartItems(

      cartItems.map((item) =>

        item._id === _id &&

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
  // Decrease Quantity
  // =============================

  const decreaseQuantity = (_id, size) => {

    setCartItems(

      cartItems.map((item) => {

        if (

          item._id === _id &&

          item.size === size

        ) {

          if (item.quantity === 1) {

            return null;

          }

          return {

            ...item,

            quantity: item.quantity - 1,

          };

        }

        return item;

      }).filter(Boolean)

    );

  };

  // =============================
  // Clear Cart
  // =============================

  const clearCart = () => {

    setCartItems([]);

    localStorage.removeItem("cartItems");

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