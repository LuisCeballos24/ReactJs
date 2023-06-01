import { useEffect, useState } from "react";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import App from "./App";

import Home from "./pages/shared/Landing/Home";
import Home_Page_user from "./pages/shared/Landing/Home_page_user";
function App() {
  ReactDOM.render(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Home_Page_user />} />
      </Routes>
    </Router>,
    document.getElementById("root")
  );
}

export default App;
