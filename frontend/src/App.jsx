import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import Profiles from "./components/Profiles";
import Films from "./components/Films";
import Genres from "./components/Genres";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profiles"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profiles />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/films"
            element={
              <ProtectedRoute>
                <Layout>
                  <Films />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/genres"
            element={
              <ProtectedRoute>
                <Layout>
                  <Genres />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/profiles" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
