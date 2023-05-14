import { Switch, Route } from "react-router-dom";
import HOME_PAGE from "./pages/shared/Home";
import Home_page_user from "./pages/shared/Home_page_user";

function App() {
  return (
    <Switch>
      <Route path="/" component={HOME_PAGE} />
      <Route path="/user" component={Home_page_user} />
    </Switch>
  );
}

export default App;
