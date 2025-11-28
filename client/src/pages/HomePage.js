import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const ShimmerCard = () => {
    return (
      <div className="card shimmer-card">
        <div className="shimmer-img"></div>
        <div className="shimmer-line short"></div>
        <div className="shimmer-line"></div>
        <div className="shimmer-line"></div>
      </div>
    );
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts();
  }, []);

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {}
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) all.push(id);
    else all = all.filter((c) => c !== id);
    setChecked(all);
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (checked.length === 0 && radio.length === 0) {
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length > 0 || radio.length > 0) {
      filteredProduct();
    }
  }, [checked, radio]);

  const filteredProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Layout title={"All Products with Best offers"}>
      <div className="home-container">
        <div className="sidebar">
          <h4>Filter by Category</h4>
          <div className="filter-box">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4>Filter by Price</h4>
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {Prices?.map((p) => (
              <div key={p._id} className="filter-box">
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>

          <button
            className="btn-clear"
            onClick={() => window.location.reload()}
          >
            Clear Filters
          </button>
        </div>

        <div className="main-content">
          <h1 className="text-center">All Products</h1>

          {loading && (
            <div className="shimmer-wrapper">
              {Array(9)
                .fill(0)
                .map((_, i) => (
                  <ShimmerCard key={i} />
                ))}
            </div>
          )}

          {!loading && (
            <div className="home-products">
              {products?.map((p) => (
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
                    <p className="product-desc">
                      {p.description.substring(0, 50)}...
                    </p>

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
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="loadmore-container">
            {products.length < total && (
              <button
                className="btn-loadmore"
                onClick={() => setPage(page + 1)}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
