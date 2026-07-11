import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/PeopleAlsoLook.css";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

import "../styles/CompleteTheLook.css";

function CompleteTheLook({ currentProduct }) {

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {
    wishlistItems,
    addToWishlist,
  } = useWishlist();

  const [products, setProducts] = useState([]);

  useEffect(() => {

    if (!currentProduct) return;

    async function loadProducts() {

      try {

        const { data } = await axios.get(
          `https://shopheim.onrender.com/api/products?gender=${currentProduct.gender}`
        );

        const outfitMap = {

          "Shirts":[
            "Jeans",
            "Cargo Pants",
            "Sneakers",
            "Watches",
            "Grooming"
          ],

          "T-Shirts":[
            "Jeans",
            "Sneakers",
            "Watches",
            "Grooming",
            "Cargo Pants"
          ],

          "Jeans":[
            "Shirts",
            "Sneakers",
            "Watches",
            "Grooming",
            "T-Shirts"
          ],

          "Blazers":[
            "Formal Shirts",
            "Formal Pants",
            "Formal Shoes",
            "Watches",
            "Waistcoats"
          ],

          "Formal Shirts":[
            "Blazers",
            "Formal Pants",
            "Formal Shoes",
            "Watches",
            "Waistcoats"
          ],

          "Sneakers":[
            "Jeans",
            "Shirts",
            "Watches",
            "Grooming",
            "Cargo Pants"
          ],

          "Sports Shoes":[
            "Men Activewear",
            "Cricket Jerseys",
            "Watches",
            "Grooming",
            "Caps"
          ],

          "Tops":[
            "Jeans",
            "Skirts",
            "Beauty",
            "Handbags",
            "Watches"
          ],

          "Skirts":[
            "Tops",
            "Beauty",
            "Handbags",
            "Sneakers",
            "Watches"
          ]

        };

        const outfit =
          outfitMap[currentProduct.category] || [];

        const filtered = data
          .filter(product =>

            product._id !== currentProduct._id &&

            outfit.includes(product.category)

          )
          .slice(0,5);

        setProducts(filtered);

      }

      catch(error){

        console.log(error);

      }

    }

    loadProducts();

  },[currentProduct]);

  const handleCart=(product)=>{

    addToCart(product);

    toast.success("Added To Cart 🛒");

  };

  const handleWishlist=(product)=>{

    const exists=wishlistItems.find(

      item=>item._id===product._id

    );

    if(exists){

      toast.info("Already In Wishlist ❤️");

      return;

    }

    addToWishlist(product);

    toast.success("Added To Wishlist ❤️");

  };

  return(

    <section className="people-look">

      <h2>Complete The Look</h2>

      <div className="people-grid">

        {

          products.map(product=>(

            <div
              key={product._id}
              className="people-card"
            >

              <button
                className="people-wishlist"
                onClick={()=>handleWishlist(product)}
              >

                <FaHeart/>

              </button>

              <img

                src={
                  product.image.startsWith("http")

                  ? product.image

                  : `https://shopheim.onrender.com${product.image}`
                }

                alt={product.name}

                onClick={()=>

                  navigate(`/product/${product._id}`)

                }

              />

              <div className="people-content">

                <span className="people-category">

                  {product.category}

                </span>

                <h3>

                  {product.name}

                </h3>

                <p className="people-brand">

                  {product.brand}

                </p>

                <div className="people-rating">

                  ⭐ {product.rating || 4.5}

                </div>

                <div className="people-price">

                  ₹{product.price}

                </div>

                <div className="people-buttons">

                  <button

                    className="people-details-btn"

                    onClick={()=>

                      navigate(`/product/${product._id}`)

                    }

                  >

                    View Details

                  </button>

                  <button

                    className="people-cart-btn"

                    onClick={()=>

                      handleCart(product)

                    }

                  >

                    Add To Cart

                  </button>

                </div>

              </div>

            </div>

          ))

        }

      </div>

    </section>

  );

}

export default CompleteTheLook;