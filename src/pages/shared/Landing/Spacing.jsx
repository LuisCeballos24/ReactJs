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
  const Login = (vista_A) => {
    // setVista_A(vista_A);
    console.log("Chil_2");
    setPage(vista_A);
  };
  const [showPage, setPage] = useState(true);

  switch (showPage) {
    case true:
      return (
        <>
          <Home princi={Login} />
        </>
      );
    case false:
      return (
        <>
          <Home_page princi={Login} />
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
