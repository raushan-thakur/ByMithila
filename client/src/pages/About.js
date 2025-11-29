import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About - Raushan Thakur"}>
      <div className="row contactus about-page">
        
        <div className="col-md-6">
          <img
            src="/images/about.jpeg"
            alt="about"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>

        <div className="col-md-5 about-text">
          <h2 className="fw-bold mb-3">About Me</h2>

          <p>
            I’m <strong>Raushan Thakur</strong>, a Software Engineer with 
            experience in building scalable web applications. I completed my B.Tech from 
            <strong> Delhi Technological University</strong>.
          </p>

          <p>
            I enjoy developing clean, scalable applications and improving 
            performance through good architecture and reusable components.
          </p>

          <h5 className="mt-3">Contact</h5>
          <p>
            📧 raushandtu@gmail.com <br />
            📞 +91 95118 74042
          </p>
        </div>

      </div>
    </Layout>
  );
};

export default About;
