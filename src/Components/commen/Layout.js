import { createContext, useState } from "react";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export const NameContext = createContext();

export default function Layout({ children }) {
  const [userLogo, setuserLogo] = useState("name");

  return (
    <>
      <NameContext.Provider value={userLogo}>
        <div id="layout-wrapper">
          <div className="page-wraper">
            <Header />
            {/* Top Nav-bar end */}
            {children}
            {/* Footer Start */}
            <Footer />
            {/* Footer Ends */}
          </div>
        </div>
      </NameContext.Provider>
    </>
  );
}
