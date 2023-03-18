import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import Header from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./screens/Login";
import PrivateRoute from "./utils/PrivateRoute";
import { theme } from "./utils/ThemeProvider";
import AdminDashboard from "./screens/AdminDashboard";
import UserDashboard from "./screens/UserDashboard";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <AuthProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Login />} exact />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
              <Route path="/user/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
            </Routes>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;