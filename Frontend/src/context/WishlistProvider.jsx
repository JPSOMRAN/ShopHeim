import { useState } from "react";

import WishlistContext from "./WishlistContext";

export function WishlistProvider({ children }) {

  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {

    const exists = wishlistItems.find(

      (item) => item.id === product.id

    );

    if (exists) return;

    setWishlistItems([

      ...wishlistItems,

      product,

    ]);

  };

  const removeFromWishlist = (id) => {

    setWishlistItems(

      wishlistItems.filter(

        (item) => item.id !== id

      )

    );

  };

  const clearWishlist = () => {

    setWishlistItems([]);

  };

  return (

    <WishlistContext.Provider

      value={{

        wishlistItems,

        addToWishlist,

        removeFromWishlist,

        clearWishlist,

      }}

    >

      {children}

    </WishlistContext.Provider>

  );

}