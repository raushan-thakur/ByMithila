import axios from "axios";
import Layout from "./../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {}
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {}
  };

  return (
    <Layout>
      {/* MAIN PRODUCT AREA */}
      <div className="product-details-container">
        
        {/* LEFT IMAGE */}
        <div className="product-image-box">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
          />
        </div>

        {/* RIGHT DETAILS */}
        <div className="product-info-box">
          <h1>{product.name}</h1>
          <p className="product-description">{product.description}</p>

          <h2 className="product-price">₹ {product.price}</h2>

          <p className="product-category">
            Category: <span>{product?.category?.name}</span>
          </p>

          <button
            className="btn btn-secondary add-cart-btn"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <hr />

      {/* SIMILAR PRODUCTS SECTION */}
      <div className="related-products-section">
        <h3>Similar Products</h3>

        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products Found</p>
        )}

        <div className="related-products-wrapper">
          {relatedProducts?.map((p) => (
            <div className="product-card" key={p._id}>
              
              <div className="product-img-wrapper">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="product-img"
                />
              </div>

              <div className="product-body">
                <h5 className="product-title">{p.name}</h5>
                <p className="product-desc">{p.description.substring(0, 50)}...</p>
                <p className="price-tag">₹ {p.price}</p>

                <div className="card-buttons">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    Details
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
