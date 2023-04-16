import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import useAxios from "../utils/useAxios";
import dayjs from "dayjs";

const DataContext = createContext();

export default DataContext;

export const DataProvider = ({ children }) => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const [loggedIn, setLoggedIn] = useState(false);

  const [evidenceData, setEvidenceData] = useState({});
  const [hubList, setHubList] = useState([]);
  const [hubCount, setHubCount] = useState(0);
  const [recentHubCount, setRecentHubCount] = useState(0);

  const [userList, setUserList] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [recentUserList, setRecentUserList] = useState([]);
  const [recentUserCount, setRecentUserCount] = useState(0);

  const [evidenceList, setEvidenceList] = useState([]);
  const [evidenceCount, setEvidenceCount] = useState(0);
  const [recentEvidenceList, setRecentEvidenceList] = useState([]);
  const [recentEvidenceCount, setRecentEvidenceCount] = useState(0);

  const cleanData = () => {
    setEvidenceData({});
    setHubList([]);
    setHubCount(0);
    setRecentHubCount(0);
    setUserList([]);
    setUserCount(0);
    setRecentUserList([]);
    setRecentUserCount(0);
    setEvidenceList([]);
    setEvidenceCount(0);
    setRecentEvidenceList([]);
    setRecentEvidenceCount(0);
  };

  const handleGetHubs = (data) => {
    const list = [];
    data.length && data.forEach((hub) => {
      list.push(hub);
    });
    setHubList(list);
    setHubCount(list.length);
  };

  const handleGetUsers = (data) => {
    const list = [];
    const recentList = [];
    const hubs = new Map();
    data.length && data.forEach((user) => {
      const canAdd = user.can_add ? "Yes" : "No";
      const canView = user.can_view ? "Yes" : "No";
      const lastLogin = dayjs(user.last_login).format("ddd MMM DD hh:mm:ss");
      const newUser = { ...user, "can_add": canAdd, "can_view": canView, "last_login": lastLogin };
      list.push(newUser);
      if (dayjs().diff(dayjs(user.last_login), "day") <= 1) {
        recentList.push(newUser);
        hubs.set(user.hub_id, true);
      }
    });
    recentList.sort((a, b) => dayjs(b.last_login).diff(dayjs(a.last_login)));
    setUserList(list);
    setUserCount(list.length);
    setRecentUserList(recentList.slice(0, 3));
    setRecentUserCount(recentList.length);
    setRecentHubCount(hubs.size);
  };

  const handleGetEvidence = (data, flag) => {
    if (flag) {
      const newEvidenceData = { globalCount: data.global_count, hubCount: data.hub_count, userCount: data.user_count };
      setEvidenceData(newEvidenceData);
      data = data.evidence_list;
    }
    const list = [];
    const recentList = [];
    data.length && data.forEach((evidence) => {
      const uploadTime = dayjs(evidence.upload_time).format("ddd MMM DD hh:mm:ss");
      const newEvidence = { ...evidence, "upload_time": uploadTime };
      list.push(newEvidence);
      if (dayjs().diff(dayjs(evidence.upload_time), "day") <= 1) {
        recentList.push(newEvidence);
      }
    });
    recentList.sort((a, b) => dayjs(b.upload_time).diff(dayjs(a.upload_time)));
    setEvidenceList(list);
    setEvidenceCount(list.length);
    setRecentEvidenceList(recentList.slice(0, 3));
    setRecentEvidenceCount(recentList.length);
  };

  const handleAdminLogin = () => {
    axiosInstance.get("/hubs/")
      .then((response) => {
        handleGetHubs(response.data);
        return axiosInstance.get("/users/")
      })
      .then((response) => {
        handleGetUsers(response.data);
        return axiosInstance.get("/evidence/")
      })
      .then((response) => {
        handleGetEvidence(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUserLogin = () => {
    axiosInstance.get("/evidence/")
      .then((response) => {
        handleGetEvidence(response.data, true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogin = () => {
    if (!user) return;
    if (user.is_admin) {
      handleAdminLogin();
    } else {
      handleUserLogin();
    }
  };

  let contextData = {
    evidenceData,
    hubList,
    hubCount,
    recentHubCount,

    userList,
    userCount,
    recentUserList,
    recentUserCount,

    evidenceList,
    evidenceCount,
    recentEvidenceList,
    recentEvidenceCount,
  };

  useEffect(() => {
    if (!user) cleanData();
    if (loggedIn) {
      handleLogin();
      setLoggedIn(false);
    }
    else {
      setLoggedIn(true);
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DataContext.Provider value={contextData}>
      {children}
    </DataContext.Provider>
  )
};
