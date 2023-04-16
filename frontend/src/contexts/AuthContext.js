import { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => sessionStorage.getItem("authTokens") ? JSON.parse(sessionStorage.getItem("authTokens")) : null);
  const [user, setUser] = useState(() => sessionStorage.getItem("authTokens") ? jwt_decode(sessionStorage.getItem("authTokens")) : null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  let loginUser = (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/token/";
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ username: e.target.username.value, password: e.target.password.value });

    axios.post(url, body, { headers })
      .then((response) => {
        const data = response.data;
        if (response.status === 200) {
          setAuthTokens(data);
          setUser(jwt_decode(data.access));
          sessionStorage.setItem("authTokens", JSON.stringify(data));
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 503) {
          window.alert("System under maintenance. Please try again later.");
        }
        else if (error.response && error.response.status === 401) {
          window.alert("Invalid username or password.");
        }
        else {
          window.alert("Something went wrong. Please try again later.");
        }
      });
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    sessionStorage.removeItem("authTokens");
    navigate("/login");
  };

  let contextData = {
    user: user,
    setUser: setUser,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,

    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider >
  )
};
