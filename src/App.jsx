import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/shared/Landing/Home";
import Home_Page_user from "./pages/shared/Landing/Home_page_user";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;
