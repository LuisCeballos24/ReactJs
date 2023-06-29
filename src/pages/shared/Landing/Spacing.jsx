import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home_page from "./Home_page_user";
import Home from "./Home";

const Home_PRINCI = () => {
  const navigate = useNavigate(); // Importa useNavigate desde react-router-dom

  const [showPage, setPage] = useState(1);

  switch (showPage) {
    case 1:
      return (
        <>
          <Home_page />
        </>
      );

    default:
      return null;
  }
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home_PRINCI />} />
      </Routes>
    </Router>
  );
};

export default App;
