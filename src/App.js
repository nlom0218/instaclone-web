import { useReactiveVar } from "@apollo/client";
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import { isLoggedInVar } from "./screens/apllo";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  return (
    <Router>
      <Switch>
        <Route exact path="/">{isLoggedIn ? <Home /> : <Login />}</Route>
        <Route><NotFound /></Route>
      </Switch>
    </Router>
  );
}

export default App;
