import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="privacy-policy"
            style={{ width: "100%" }}
          />
        </div>

        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">PRIVACY POLICY</h1>

          <p className="mt-3">

            We may collect basic information such as your name, email address, and 
            contact details for account creation, order processing, and customer support.
          </p>

          <p>
            By using our website, you agree to the collection and use of information in 
            accordance with this Privacy Policy.
          </p>

          <p>
            If you have any questions regarding this policy, feel free to contact us 
            at any time.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
