import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function Layout({ children }) {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
