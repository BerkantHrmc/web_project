import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(form.username, form.password);
    if (result.success) {
      navigate("/profiles");
    } else {
      setError(result.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "white",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          Giriş Yap
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "4px" }}>
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                outline: "none",
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "4px" }}>
              Şifre
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                outline: "none",
              }}
            />
          </div>
          {error && <p style={{ color: "#ef4444", fontSize: "14px" }}>{error}</p>}
          <button
            type="submit"
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#6366f1",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Giriş Yap
          </button>
          <p style={{ textAlign: "center", fontSize: "14px", color: "#6b7280" }}>
            Hesabınız yok mu?{" "}
            <Link to="/register" style={{ color: "#6366f1", textDecoration: "none" }}>
              Kayıt Ol
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;



