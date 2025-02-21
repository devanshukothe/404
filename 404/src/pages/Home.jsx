import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CandidateList from "./election/CandidateList";
import Features from "./Features";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <h1 className="display-3 fw-bold text-center text-dark mt-4">
  Welcome to the Dashboard
</h1>
<p className="lead text-center text-secondary mx-auto" style={{ maxWidth: "600px", fontSize: "1.2rem" }}>
  Your centralized hub for seamless management and efficiency.
</p>
      <CandidateList />
      <h2 className="text-dark fw-bold mb-5 text-center">Dashboard Features</h2>
      <Features />
    </>
  );
};

export default Home;
