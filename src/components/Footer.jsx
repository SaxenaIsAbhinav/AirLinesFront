// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white text-center py-4 mt-8">
      © {new Date().getFullYear()} SkyEase. All rights reserved.
    </footer>
  );
};

export default Footer;