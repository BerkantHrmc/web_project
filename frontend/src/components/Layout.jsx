import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Layout({ children }) {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <nav
        style={{
          background: "white",
          padding: "16px 32px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Link
              to="/profiles"
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#6366f1",
                textDecoration: "none",
              }}
            >
              Film Yönetim Sistemi
            </Link>
            <div style={{ display: "flex", gap: "16px" }}>
              <Link
                to="/profiles"
                style={{
                  color: "#4b5563",
                  textDecoration: "none",
                  fontWeight: "500",
                  padding: "8px 12px",
                  borderRadius: "6px",
                }}
              >
                {isAdmin() ? "Profiller" : "Kullanıcılar"}
              </Link>
              <Link
                to="/films"
                style={{
                  color: "#4b5563",
                  textDecoration: "none",
                  fontWeight: "500",
                  padding: "8px 12px",
                  borderRadius: "6px",
                }}
              >
                Filmler
              </Link>
              {isAdmin() && (
                <Link
                  to="/genres"
                  style={{
                    color: "#4b5563",
                    textDecoration: "none",
                    fontWeight: "500",
                    padding: "8px 12px",
                    borderRadius: "6px",
                  }}
                >
                  Türler
                </Link>
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            {user && (
              <>
                <span style={{ color: "#6b7280", fontSize: "14px" }}>
                  {user.username} ({user.profileType?.name || "Kullanıcı"})
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    background: "white",
                    color: "#4b5563",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                >
                  Çıkış Yap
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}

export default Layout;


