import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Recommendations from "./components/Recommendations";

const App = () => {
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("library-user-token"));
  }, []);

  const padding = {
    padding: 5,
  };

  const logout = () => {
    console.log("logout");
    setToken(null);
    localStorage.clear();
    client.resetStore();

    //redirect to login
    navigate("/login");
  };

  return (
    <div>
      <div>
        <Link style={padding} to="/authors">
          authors
        </Link>
        <Link style={padding} to="/books">
          books
        </Link>
        {token ? (
          <>
            <Link style={padding} to="/add">
              add book
            </Link>
            <Link style={padding} to="/recommend">
              recommend
            </Link>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </div>

      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommend" element={<Recommendations />} />
        {!token && (
          <Route path="/login" element={<LoginForm setToken={setToken} />} />
        )}
        <Route path="*" element={<Navigate replace to="/books" />} />
      </Routes>
    </div>
  );
};

export default App;
