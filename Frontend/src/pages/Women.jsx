import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";



import "../styles/Women.css";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

function Women() {

   const navigate = useNavigate();

   const { addToCart } = useCart();

   const {
      wishlistItems,
      addToWishlist,
   } = useWishlist();

   const [womenProducts, setWomenProducts] = useState([]);

   const [loading, setLoading] = useState(true);

   const [filter, setFilter] = useState("All");

   useEffect(() => {

      async function fetchProducts() {

         try {

            const { data } = await API.get(
               "/products?gender=Women"
            );

            setWomenProducts(data);

         }

         catch (error) {

            console.log(error);

            toast.error(
               "Failed To Load Products"
            );

         }

         finally {

            setLoading(false);

         }

      }

      fetchProducts();

   }, []);

   const filteredProducts =

      filter === "All"

         ? womenProducts

         : womenProducts.filter(

              (item) =>

                 item.category === filter

           );

   const handleCart = (item) => {

      addToCart(item);

      toast.success(
         "Added To Cart 🛒"
      );

   };

   const handleWishlist = (item) => {

      const exists = wishlistItems.find(

         (product) =>

            product._id === item._id

      );

      if (exists) {

         toast.info(
            "Already In Wishlist ❤️"
         );

         return;

      }

      addToWishlist(item);

      toast.success(
         "Added To Wishlist ❤️"
      );

   };

   if (loading) {

      return (
         <>
           
            <h2
               style={{
                  textAlign: "center",
                  marginTop: "120px",
               }}
            >
               Loading...
            </h2>
         </>
      );

   }

   return (

      <>

       

         <section className="women-page">

            <h1>
               WOMEN'S COLLECTION
            </h1>

            <p className="women-subtitle">
               Premium Fashion Collection For Women
            </p>

            <div className="filter-bar">

               <button onClick={() => setFilter("All")}>
                  All Products
               </button>

               <button onClick={() => setFilter("Blazers")}>
                  Blazers
               </button>

               <button onClick={() => setFilter("Tops")}>
                  Tops
               </button>

               <button onClick={() => setFilter("T-Shirts")}>
                  T-Shirts
               </button>

               <button onClick={() => setFilter("Jeans")}>
                  Jeans
               </button>

               <button onClick={() => setFilter("Formal Pants")}>
                  Formal Pants
               </button>

               <button onClick={() => setFilter("Denim Jackets")}>
                  Denim Jackets
               </button>

            </div>

            <div className="women-grid">

               {

                  filteredProducts.map((item) => (

                     <div
                        key={item._id}
                        className="women-card"
                     >

                        <img

                           src={
                              item.image.startsWith("http")
                                 ? item.image
                                 : `https://shopheim.onrender.com${item.image}`
                           }

                           alt={item.name}

                           onClick={() =>
                              navigate(
                                 `/product/${item._id}`
                              )
                           }

                        />

                        <div className="women-info">

                           <span className="category-tag">

                              {item.category}

                           </span>

                           <h3>

                              {item.name}

                           </h3>

                           <p>

                              ₹{item.price}

                           </p>

                           <div className="women-button-group">

                              <button

                                 className="women-details-btn"

                                 onClick={() =>
                                    navigate(
                                       `/product/${item._id}`
                                    )
                                 }

                              >

                                 View Details

                              </button>

                              <button

                                 className="women-cart-btn"

                                 onClick={() =>
                                    handleCart(item)
                                 }

                              >

                                 Add To Cart

                              </button>

                              <button

                                 className="women-wishlist-btn"

                                 onClick={() =>
                                    handleWishlist(item)
                                 }

                              >

                                 ❤️

                              </button>

                           </div>

                        </div>

                     </div>

                  ))

               }

            </div>

         </section>

      </>

   );

}

export default Women;