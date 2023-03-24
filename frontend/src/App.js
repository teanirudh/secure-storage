import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import { theme } from "./utils/ThemeProvider";
import CustomAppBar from "./components/CustomAppBar";
import Login from "./screens/Login";
import AdminDashboard from "./screens/AdminDashboard";
import AdminViewUsers from "./screens/AdminViewUsers";
import AdminViewEvidence from "./screens/AdminViewEvidence";
import AdminViewHubs from "./screens/AdminViewHubs";
import UserDashboard from "./screens/UserDashboard";
import UserViewEvidence from "./screens/UserViewEvidence";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <AuthProvider>
            <CustomAppBar />
            <Routes>
              <Route path="/" element={<Login />} exact />
              <Route path="/login" element={<Login />} />
              <Route path="/admin">
                <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
                <Route path="/admin/view-users" element={<PrivateRoute><AdminViewUsers /></PrivateRoute>} />
                <Route path="/admin/view-evidence" element={<PrivateRoute><AdminViewEvidence /></PrivateRoute>} />
                <Route path="/admin/view-hubs" element={<PrivateRoute><AdminViewHubs /></PrivateRoute>} />
              </Route>
              <Route path="/user">
                <Route path="/user/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
                <Route path="/user/view-evidence" element={<PrivateRoute><UserViewEvidence /></PrivateRoute>} />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;