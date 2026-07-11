import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";



import "../styles/Men.css";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

function Men() {

   const navigate = useNavigate();

   const { addToCart } = useCart();

   const {
      wishlistItems,
      addToWishlist,
   } = useWishlist();

   const [menProducts, setMenProducts] = useState([]);

   const [loading, setLoading] = useState(true);

   const [filter, setFilter] = useState("All");

   useEffect(() => {

      async function fetchProducts() {

         try {

            const { data } = await API.get(
               "/products?gender=Men"
            );

            setMenProducts(data);

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

         ? menProducts

         : menProducts.filter(

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

         

         <section className="men-page">

            <h1>
               MEN'S COLLECTION
            </h1>

            <p className="men-subtitle">
               Premium Fashion Collection For Men
            </p>

            <div className="filter-section">

               <label>
                  Category
               </label>

               <select
                  value={filter}
                  onChange={(e) =>
                     setFilter(
                        e.target.value
                     )
                  }
               >

                  <option value="All">
                     All Products
                  </option>

                  <option value="Shirts">
                     Shirts
                  </option>

                  <option value="Blazers">
                     Blazers
                  </option>

                  <option value="Jeans">
                     Jeans
                  </option>

                  <option value="T-Shirts">
                     T-Shirts
                  </option>

                  <option value="Cargo Pants">
                     Cargo Pants
                  </option>

                  <option value="Sneakers">
                     Sneakers
                  </option>

                  <option value="Sports Shoes">
                     Sports Shoes
                  </option>

                  <option value="Formal Shoes">
                     Formal Shoes
                  </option>

                  <option value="Boots">
                     Boots
                  </option>

                  <option value="Sandals">
                     Sandals
                  </option>

                  <option value="Denim Jackets">
                     Denim Jackets
                  </option>

                  <option value="Watches">
                     Watches
                  </option>

               </select>

            </div>

            <div className="men-grid">

               {

                  filteredProducts.map((item) => (

                     <div
                        key={item._id}
                        className="men-card"
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

                        <div className="men-info">

                           <span className="category-tag">

                              {item.category}

                           </span>

                           <h3>

                              {item.name}

                           </h3>

                           <p>

                              ₹{item.price}

                           </p>

                           <div className="men-button-group">

                              <button

                                 className="men-details-btn"

                                 onClick={() =>
                                    navigate(
                                       `/product/${item._id}`
                                    )
                                 }

                              >

                                 View Details

                              </button>

                              <button

                                 className="men-cart-btn"

                                 onClick={() =>
                                    handleCart(item)
                                 }

                              >

                                 Add To Cart

                              </button>

                              <button

                                 className="men-wishlist-btn"

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

export default Men;