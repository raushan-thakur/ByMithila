import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact - Raushan Thakur"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="contact-us"
            style={{ width: "100%" }}
          />
        </div>

        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT ME</h1>

          <p className="text-justify mt-2">
            For any queries, project discussions, collaborations, or backend/frontend 
            development work, feel free to reach out. I am available and responsive.
          </p>

          <p className="mt-3">
            <BiMailSend /> : raushandtu@gmail.com
          </p>

          <p className="mt-3">
            <BiPhoneCall /> : +91 9511874042
          </p>

          <p className="mt-3">
            <BiSupport /> : GitHub – https://github.com/raushan-thakur
          </p>

          <p className="mt-3">
            <BiSupport /> : LinkedIn – https://linkedin.com/in/raushan-thakur
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
