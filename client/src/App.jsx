import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddPassword from "./components/AddPassword";
import ViewPasswords from "./components/ViewPasswords";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-password"
          element={
            <ProtectedRoute>
              <AddPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-passwords"
          element={
            <ProtectedRoute>
              <ViewPasswords />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
