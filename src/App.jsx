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
// import { useEffect, useState } from "react";
// import HOME_PAGE from "./pages/shared/Landing/Home";
// import Home_page_user from "./pages/shared/Landing/Home_page_user";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// function App() {
//   const [pathname, setPathname] = useState(window.location.pathname);
//
//   useEffect(() => {
//     const handleLocationChange = () => {
//       setPathname(window.location.pathname);
//     };
//
//     window.addEventListener("popstate", handleLocationChange);
//
//     return () => {
//       window.removeEventListener("popstate", handleLocationChange);
//     };
//   }, []);
//
//   if (pathname === "/user") {
//     return <Home_page_user />;
//   } else {
//     return <HOME_PAGE />;
//   }
// }
//
// export default App;
