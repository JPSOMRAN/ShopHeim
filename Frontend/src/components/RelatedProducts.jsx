import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { menProducts } from "../data/menProducts";
import { womenProducts } from "../data/womenProducts";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

import "../styles/RelatedProducts.css";

function RelatedProducts({ currentProduct }) {

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {

    wishlistItems,

    addToWishlist,

  } = useWishlist();

  const allProducts = [

    ...menProducts,

    ...womenProducts,

  ];

  const currentGender =

    currentProduct.id <= 83

      ? "men"

      : "women";

  const relatedProducts =

    allProducts

      .filter((item) => {

        const itemGender =

          item.id <= 83

            ? "men"

            : "women";

        return (

          item.category === currentProduct.category &&

          itemGender === currentGender &&

          item.id !== currentProduct.id

        );

      })

      .slice(0, 4);

  const handleCart = (item) => {

    addToCart(item);

    toast.success("Added To Cart 🛒");

  };

  const handleWishlist = (item) => {

    const exists = wishlistItems.find(

      (product) => product.id === item.id

    );

    if (exists) {

      toast.info("Already In Wishlist ❤️");

      return;

    }

    addToWishlist(item);

    toast.success("Added To Wishlist ❤️");

  };

  return (

    <section className="related-products">

      <h2>

        You May Also Like

      </h2>

      <div className="related-grid">

        {

          relatedProducts.map((item) => (

            <div

              key={item.id}

              className="related-card"

            >

              <img

                src={item.image}

                alt={item.name}

              />

              <h3>

                {item.name}

              </h3>

              <p>

                {item.price}

              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >

                <button

                  onClick={() =>

                    navigate(`/product/${item.id}`)

                  }

                >

                  Details

                </button>

                <button

                  onClick={() =>

                    handleCart(item)

                  }

                >

                  Cart

                </button>

                <button

                  onClick={() =>

                    handleWishlist(item)

                  }

                >

                  ❤️

                </button>

              </div>

            </div>

          ))

        }

      </div>

    </section>

  );

}

export default RelatedProducts;