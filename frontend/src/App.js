import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import { theme } from "./utils/ThemeProvider";
import AppBar from "./components/AppBar";
import Login from "./screens/Login";
import AdminDashboard from "./screens/AdminDashboard";
import AdminViewUsers from "./screens/AdminViewUsers";
import AdminViewEvidence from "./screens/AdminViewEvidence";
import UserDashboard from "./screens/UserDashboard";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <AuthProvider>
            <AppBar />
            <Routes>
              <Route path="/" element={<Login />} exact />
              <Route path="/login" element={<Login />} />
              <Route path="/admin">
                <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
                <Route path="/admin/users" element={<PrivateRoute><AdminViewUsers /></PrivateRoute>} />
                <Route path="/admin/evidence" element={<PrivateRoute><AdminViewEvidence /></PrivateRoute>} />
              </Route>
              <Route path="/user">
                <Route path="/user/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;