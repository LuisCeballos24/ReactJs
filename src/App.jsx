import React, { useState } from "react";
import Home from "./pages/shared/Landing/Spacing.jsx";
//import Home_Page_user from "./pages/shared/Landing/Home_page_user";

function App() {
  const [route, setRoute] = useState("/");

  const renderComponent = () => {
    switch (route) {
      case "/":
        return <Home />;
      //case "/user":
      //return <Home_Page_user />;
      default:
        return <Home />;
    }
  };

  return <>{renderComponent()}</>;
}

export default App;
