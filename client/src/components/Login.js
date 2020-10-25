import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { CredentialsContext } from "../App";

const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    console.log(message);
    throw Error(message);
  }
  return response.json();
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const loginChange = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(handleErrors)
      .then(() => {
        setCredentials({
          username: username,
          password: password,
        });
        history.push("/");
      })
      .catch((error) => {
        // if there is an error it will print the response from index.js post which was res.json({message:"user already exits"})
        console.log(error);
        setError(error.message);
      });
  };

  const history = useHistory();

  return (
    <div>
      <h1> Login </h1>
      <Link to="/">Home</Link>
      <form action="" className="form-group" onSubmit={loginChange}>
        {error && <span style={{ color: "red" }}>{error}</span>}
        <input
          className="form-control w-50 mx-auto"
          type="text"
          name="username"
          id="usernameinput"
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className="form-control w-50 mx-auto"
          type="password"
          name="password"
          value={password}
          id="passwordinput"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
