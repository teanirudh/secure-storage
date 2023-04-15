import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import useAxios from "../utils/useAxios";
import dayjs from "dayjs";

const DataContext = createContext();

export default DataContext;

export const DataProvider = ({ children }) => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const [userList, setUserList] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [recentUserList, setRecentUserList] = useState([]);
  const [recentUserCount, setRecentUserCount] = useState(0);

  const [evidenceList, setEvidenceList] = useState([]);
  const [evidenceCount, setEvidenceCount] = useState(0);
  const [recentEvidenceList, setRecentEvidenceList] = useState([]);
  const [recentEvidenceCount, setRecentEvidenceCount] = useState(0);

  const [hubList, setHubList] = useState([]);
  const [hubCount, setHubCount] = useState(0);
  const [recentHubCount, setRecentHubCount] = useState(0);

  const getUsers = () => {
    axiosInstance.get("/user/")
      .then((response) => {
        const list = [];
        const recentList = [];
        const hubs = new Map();
        response.data.forEach((user) => {
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
        setUserList(list);
        setUserCount(list.length);
        setRecentUserList(recentList);
        setRecentUserCount(recentList.length);
        setRecentHubCount(hubs.size);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getEvidence = () => {
    axiosInstance.get("/evidence/")
      .then((response) => {
        const list = [];
        const recentList = [];
        response.data.forEach((evidence) => {
          const uploadTime = dayjs(evidence.upload_time).format("ddd MMM DD hh:mm:ss");
          const newEvidence = { ...evidence, "upload_time": uploadTime };
          list.push(newEvidence);
          if (dayjs().diff(dayjs(evidence.upload_time), "day") <= 1) {
            recentList.push(newEvidence);
          }
        });
        setEvidenceList(list);
        setEvidenceCount(list.length);
        setRecentEvidenceList(recentList);
        setRecentEvidenceCount(recentList.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getHubs = () => {
    axiosInstance.get("/hub/")
      .then((response) => {
        const list = [];
        response.data.forEach((hub) => {
          list.push(hub);
        });
        setHubList(list);
        setHubCount(list.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let contextData = {
    userList,
    userCount,
    recentUserList,
    recentUserCount,

    evidenceList,
    evidenceCount,
    recentEvidenceList,
    recentEvidenceCount,

    hubList,
    hubCount,
    recentHubCount,
  };

  useEffect(() => {
    if (user) {
      if (user.is_admin) {
        getUsers();
        getHubs();
      }
      getEvidence();
    }
  }, []);

  return (
    <DataContext.Provider value={contextData}>
      {children}
    </DataContext.Provider>
  )
}