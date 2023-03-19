import { useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import AuthContext from "../contexts/AuthContext";

const baseURL = "http://localhost:8000";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens, logoutUser } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: { "Authorization": `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async (request) => {
    const refreshDecoded = jwt_decode(authTokens.refresh);
    const refreshExpired = dayjs.unix(refreshDecoded.exp).diff(dayjs()) < 1;

    const accessDecoded = jwt_decode(authTokens.access);
    const accessExpired = dayjs.unix(accessDecoded.exp).diff(dayjs()) < 1;

    if (refreshExpired) logoutUser();
    if (!accessExpired) return request;

    const response = await axios.post(`${baseURL}/token/refresh/`, { "refresh": authTokens.refresh });
    const newTokens = Object.assign({}, response.data, { "refresh": authTokens.refresh });

    localStorage.setItem("authTokens", JSON.stringify(newTokens));
    setAuthTokens(newTokens);
    setUser(jwt_decode(response.data.access));

    request.headers.Authorization = `Bearer ${response.data.access}`;
    return request;
  });

  return axiosInstance;
};

export default useAxios;