import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CredentialsContext } from "../App";
import Todos from "./Todos";

function Welcome() {
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const Logout = () => {
    setCredentials(null);
  };
  return (
    <div>
      {credentials && <button onClick={Logout}>Logout</button>}
      <h1>Welcome {credentials && credentials.username}</h1>
      {!credentials && (
        <div>
          <Link to="/register">Register</Link>
          <br />
          <Link to="/login">Login</Link>
        </div>
      )}
      {credentials && <Todos />}
    </div>
  );
}

export default Welcome;
