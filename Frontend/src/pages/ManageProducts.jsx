import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";



import "../styles/ManageProducts.css";

function ManageProducts() {

  const API = "https://shopheim.onrender.com";

  // ==========================
  // States
  // ==========================

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({

    name: "",

    brand: "",

    category: "",

    gender: "Men",

    image: "",

    description: "",

    price: "",

    rating: 4.5,

    stock: 100,

  });

  // ==========================
  // Load Products
  // ==========================

  useEffect(() => {

    const loadProducts = async () => {

      try {

        const { data } = await axios.get(

          `${API}/api/products`

        );

        setProducts(data);

      }

      catch (error) {

        console.log(error);

        toast.error("Unable to load products");

      }

      finally {

        setLoading(false);

      }

    };

    loadProducts();

  }, []);

  // ==========================
  // Fetch Products Again
  // ==========================

  const fetchProducts = async () => {

    try {

      const { data } = await axios.get(

        `${API}/api/products`

      );

      setProducts(data);

    }

    catch (error) {

      console.log(error);

      toast.error("Unable to refresh products");

    }

  };

  // ==========================
  // Handle Input
  // ==========================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  // ==========================
  // Upload Image
  // ==========================

  const uploadImage = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const imageData = new FormData();

    imageData.append(

      "image",

      file

    );

    try {

      setUploading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.post(

        `${API}/api/upload`,

        imageData,

        {

          headers: {

            Authorization: `Bearer ${token}`,

            "Content-Type": "multipart/form-data",

          },

        }

      );

      setFormData((prev) => ({

        ...prev,

        image: data.image,

      }));

      toast.success(

        "Image Uploaded Successfully"

      );

    }

    catch (error) {

      console.log(error);

      toast.error(

        "Image Upload Failed"

      );

    }

    finally {

      setUploading(false);

    }

  };
    // ==========================
  // Reset Form
  // ==========================

  const resetForm = () => {

    setEditingId(null);

    setFormData({

      name: "",

      brand: "",

      category: "",

      gender: "Men",

      image: "",

      description: "",

      price: "",

      rating: 4.5,

      stock: 100,

    });

  };

  // ==========================
  // Add Product
  // ==========================

  const addProduct = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.post(

        `${API}/api/products`,

        formData,

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      toast.success("Product Added Successfully");

      fetchProducts();

      resetForm();

    }

    catch (error) {

      console.log(error);

      toast.error(

        error.response?.data?.message ||

        "Unable to Add Product"

      );

    }

  };

  // ==========================
  // Edit Product
  // ==========================

  const editProduct = (product) => {

    setEditingId(product._id);

    setFormData({

      name: product.name,

      brand: product.brand,

      category: product.category,

      gender: product.gender,

      image: product.image,

      description: product.description,

      price: product.price,

      rating: product.rating,

      stock: product.stock,

    });

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };

  // ==========================
  // Update Product
  // ==========================

  const updateProduct = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(

        `${API}/api/products/${editingId}`,

        formData,

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      toast.success(

        "Product Updated Successfully"

      );

      fetchProducts();

      resetForm();

    }

    catch (error) {

      console.log(error);

      toast.error(

        error.response?.data?.message ||

        "Unable to Update Product"

      );

    }

  };

  // ==========================
  // Delete Product
  // ==========================

  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm(

      "Are you sure you want to delete this product?"

    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await axios.delete(

        `${API}/api/products/${id}`,

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      toast.success(

        "Product Deleted Successfully"

      );

      fetchProducts();

    }

    catch (error) {

      console.log(error);

      toast.error(

        error.response?.data?.message ||

        "Unable to Delete Product"

      );

    }

  };

  // ==========================
  // Search Filter
  // ==========================

  const filteredProducts = products.filter(

    (product) =>

      product.name

        .toLowerCase()

        .includes(

          search.toLowerCase()

        ) ||

      product.brand

        .toLowerCase()

        .includes(

          search.toLowerCase()

        ) ||

      product.category

        .toLowerCase()

        .includes(

          search.toLowerCase()

        )

  );

  if (loading) {

    return (

      <>

  
        <div

          style={{

            color: "white",

            textAlign: "center",

            marginTop: "150px",

            fontSize: "24px",

          }}

        >

          Loading Products...

        </div>

      </>

    );

  }

    return (

    <>

    

      <section className="admin-page">

        <div className="admin-container">

          <h1>

            Manage Products

          </h1>

          <input

            className="search-input"

            type="text"

            placeholder="Search Products..."

            value={search}

            onChange={(e) =>

              setSearch(e.target.value)

            }

          />

          <div className="product-form">

            <input

              name="name"

              placeholder="Product Name"

              value={formData.name}

              onChange={handleChange}

            />

            <input

              name="brand"

              placeholder="Brand"

              value={formData.brand}

              onChange={handleChange}

            />

            <input

              name="category"

              placeholder="Category"

              value={formData.category}

              onChange={handleChange}

            />

            <select

              name="gender"

              value={formData.gender}

              onChange={handleChange}

            >

              <option value="Men">

                Men

              </option>

              <option value="Women">

                Women

              </option>

            </select>

            {/* ======================
                Image Upload
            ====================== */}

            <div>

              <input

                type="file"

                accept="image/*"

                onChange={uploadImage}

              />

              {

                uploading && (

                  <p>

                    Uploading Image...

                  </p>

                )

              }

              {

                formData.image && (

                  <img

                    src={

                      formData.image.startsWith("http")

                        ? formData.image

                        : `https://shopheim.onrender.com${formData.image}`

                    }

                    alt="Preview"

                    className="table-image"

                    style={{

                      marginTop: "10px",

                    }}

                  />

                )

              }

            </div>

            <textarea

              name="description"

              placeholder="Description"

              value={formData.description}

              onChange={handleChange}

            />

            <input

              name="price"

              type="number"

              placeholder="Price"

              value={formData.price}

              onChange={handleChange}

            />

            <input

              name="rating"

              type="number"

              step="0.1"

              value={formData.rating}

              onChange={handleChange}

            />

            <input

              name="stock"

              type="number"

              value={formData.stock}

              onChange={handleChange}

            />

            {

              editingId ? (

                <button

                  className="save-btn"

                  onClick={updateProduct}

                >

                  Update Product

                </button>

              ) : (

                <button

                  className="save-btn"

                  onClick={addProduct}

                >

                  Add Product

                </button>

              )

            }

          </div>

          <table className="products-table">

            <thead>

              <tr>

                <th>Image</th>

                <th>Name</th>

                <th>Brand</th>

                <th>Category</th>

                <th>Price</th>

                <th>Stock</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

  {

    filteredProducts.length === 0 ? (

      <tr>

        <td colSpan="7">

          No Products Found

        </td>

      </tr>

    ) : (

      filteredProducts.map((product) => (

        <tr

          key={product._id}

        >

          <td>

            <img

              src={

                product.image.startsWith("http")

                  ? product.image

                  : `${API}${product.image}`

              }

              alt={product.name}

              className="table-image"

            />

          </td>

          <td>

            {product.name}

          </td>

          <td>

            {product.brand}

          </td>

          <td>

            {product.category}

          </td>

          <td>

            ₹{product.price}

          </td>

          <td>

            {product.stock}

          </td>

          <td>

            <div

              style={{

                display: "flex",

                gap: "10px",

                justifyContent: "center",

              }}

            >

              <button

                className=""

                onClick={() =>

                  editProduct(product)

                }

              >

                Edit

              </button>

              <button

                className="delete-btn"

                onClick={() =>

                  deleteProduct(product._id)

                }

              >

                Delete

              </button>

            </div>

          </td>

        </tr>

      ))

    )

  }

</tbody>

</table>

</div>

</section>

</>

);

}

export default ManageProducts;