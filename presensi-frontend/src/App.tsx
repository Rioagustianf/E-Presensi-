import { Dashboard } from "./pages/dashboard/dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { Absensi } from "./pages/dashboard/absensi";
import { Permission } from "./pages/dashboard/permission";
import ProfilePage from "./pages/profile/EditProfile";
import LandingPage from "./pages/LandingPage";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./hooks/protectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/absensi"
            element={
              <ProtectedRoute>
                <Absensi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/permission"
            element={
              <ProtectedRoute>
                <Permission />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/account"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
