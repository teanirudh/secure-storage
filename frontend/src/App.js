import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute adminComponent={<AdminDashboard />} userComponent={<UserDashboard />} />} exact />
              <Route path="/dashboard" element={<PrivateRoute adminComponent={<AdminDashboard />} userComponent={<UserDashboard />} />} />
              <Route path="/users" element={<PrivateRoute adminComponent={<AdminViewUsers />} userComponent={<UserDashboard />} />} />
              <Route path="/hubs" element={<PrivateRoute adminComponent={<AdminViewHubs />} userComponent={<UserDashboard />} />} />
              <Route path="/evidence" element={<PrivateRoute adminComponent={<AdminViewEvidence />} userComponent={<UserViewEvidence />} />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;