import { useEffect, useState } from "react";
import HOME_PAGE from "./pages/shared/Landing/Home";
import Home_page_user from "./pages/shared/Landing/Home_page_user";

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  if (pathname === "/user") {
    return <Home_page_user />;
  } else {
    return <HOME_PAGE />;
  }
}

export default App;
