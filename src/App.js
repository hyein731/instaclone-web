import { useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch/*, Redirect*/ } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { isLoggedInVar, darkModeVar } from "./apollo";
import { darkTheme, lightTheme, GlobalStyles } from "./styles";
import SignUp from "./screens/SignUp";
import routes from "./routes";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path={routes.home} exact>
            { isLoggedIn? <Home /> : <Login /> }
          </Route>
          
          { !isLoggedIn? (
              <Route path={routes.signUp}>
                <SignUp />
              </Route>
            ) : null }
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
