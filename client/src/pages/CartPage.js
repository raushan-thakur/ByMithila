import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // CALCULATE TOTAL
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => (total += item.price));
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {}
  };

  // REMOVE ITEM
  const removeCartItem = (pid) => {
    try {
      const updated = cart.filter((item) => item._id !== pid);
      setCart(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
    } catch (error) {}
  };

  // GET PAYMENT TOKEN
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
    // eslint-disable-next-line
  }, [auth?.token]);

  // HANDLE PAYMENT
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();

      await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });

      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      toast.success("Payment completed successfully");
      navigate("/dashboard/user/orders");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        {/* HEADER */}
        <h1 className="cp-title text-center">
          {!auth?.user ? "Hello Guest" : `Hello ${auth?.user?.name}`}
          <p>
            {cart?.length
              ? `You have ${cart.length} item(s) in your cart ${auth?.token ? "" : " — please login to checkout!"}`
              : "Your cart is empty"}
          </p>
        </h1>

        <div className="container">
          <div className="row">

            {/* LEFT — CART ITEMS */}
            <div className="col-md-7">
              {cart?.map((p) => (
                <div className="col card cp-card" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="card-img-top"
                    />
                  </div>

                  <div className="col-md-5 cp-info">
                    <p className="cp-name">{p.name}</p>
                    <p className="cp-desc">{p.description.substring(0, 40)}...</p>
                    <p className="cp-price">₹ {p.price}</p>
                  </div>

                  <div className="col-md-3 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — SUMMARY */}
            <div className="col-md-5">
              <div className="cart-summary">
                <h2>Cart Summary</h2>
                <p>Total | Checkout | Payment</p>
                <hr />
                <h4>Total: {totalPrice()}</h4>

                {/* ADDRESS */}
                {auth?.user?.address ? (
                  <div className="mt-3">
                    <h5>Current Address</h5>
                    <p className="cp-address">{auth.user.address}</p>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-outline-warning mt-3"
                    onClick={() =>
                      navigate(auth?.token ? "/dashboard/user/profile" : "/login", {
                        state: "/cart",
                      })
                    }
                  >
                    {auth?.token ? "Update Address" : "Please login to checkout"}
                  </button>
                )}

                {/* PAYMENT SECTION */}
                <div className="mt-4">
                  {!clientToken || !auth?.token || !cart?.length ? null : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: { flow: "vault" },
                        }}
                        onInstance={(i) => setInstance(i)}
                      />
                      <button
                        className="btn btn-primary pay-btn"
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing..." : "Make Payment"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
