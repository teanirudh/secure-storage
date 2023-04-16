import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import PrivateRoute from "./utils/PrivateRoute";
import { theme } from "./utils/ThemeProvider";
import CustomAppBar from "./components/CustomAppBar";
import LoginView from "./screens/LoginView";
import Dashboard from "./screens/Dashboard";
import HubsView from "./screens/HubsView";
import UsersView from "./screens/UsersView";
import EvidenceView from "./screens/EvidenceView";
import HomeView from "./screens/HomeView";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <AuthProvider>
            <DataProvider>
              <CustomAppBar />
              <Routes>
                <Route path="/login" element={<LoginView />} />
                <Route path="/" element={<PrivateRoute adminComponent={<Dashboard />} userComponent={<HomeView />} />} exact />
                <Route path="/dashboard" element={<PrivateRoute adminComponent={<Dashboard />} userComponent={<HomeView />} />} />
                <Route path="/hubs" element={<PrivateRoute adminComponent={<HubsView />} userComponent={<HomeView />} />} />
                <Route path="/users" element={<PrivateRoute adminComponent={<UsersView />} userComponent={<HomeView />} />} />
                <Route path="/evidence" element={<PrivateRoute adminComponent={<EvidenceView />} userComponent={<HomeView />} />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </DataProvider>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
