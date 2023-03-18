import { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null);
  const [user, setUser] = useState(() => localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/token/";
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ username: e.target.username.value, password: e.target.password.value });
    const response = await axios.post(url, body, { headers })
      .then((res) => {
        return res;
      })
      .catch((res) => {
        return res;
      });
    const data = response.data;

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/dashboard");
    }
    else {
      alert("Invalid username or password");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  let updateToken = async () => {
    const url = "http://localhost:8000/token/refresh/";
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ "refresh": authTokens?.refresh });
    const response = await axios.post(url, body, { headers })
      .then((res) => {
        return res;
      })
      .catch((res) => {
        return res;
      });
    const data = response.data;

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    }
    else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
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
    if (loading) {
      updateToken();
    }

    let time = 1000 * 45;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, time);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider >
  )
}