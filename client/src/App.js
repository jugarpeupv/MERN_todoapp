import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Welcome from "./components/Welcome";
import Register from "./components/Register";
import Login from "./components/Login";

export const CredentialsContext = React.createContext();

function App() {
  const credentialsState = useState(null);
  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialsState}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
