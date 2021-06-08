import { useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch/*, Redirect*/ } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { isLoggedInVar, darkModeVar } from "./apollo";

const lightTheme = {
  fontColor: "#2c2c2c",
  bgColor: "lightgray",
};

const darkTheme = {
  fontColor: "lightgray",
  bgColor: "#2c2c2c",
};

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode? darkTheme : lightTheme}>
      <Router>
        <Switch>
          <Route path="/" exact>
            { isLoggedIn? (
              <Home />
            ): (
              <Login /> 
            )}
          </Route>
          <Route>
            <NotFound />
            {/* <Redirect to="/" /> */}
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
