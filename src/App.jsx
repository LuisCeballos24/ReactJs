import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/shared/Landing/Home";
import Home_Page_user from "./pages/shared/Landing/Home_page_user";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Home_Page_user />} />
      </Routes>
    </Router>
  );
}

export default App;
