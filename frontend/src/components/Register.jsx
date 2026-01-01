import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Şifreler eşleşmiyor");
      return;
    }
    const result = await register(form.username, form.email, form.password, form.confirmPassword);
    if (result.success) {
      navigate("/login");
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
          Kayıt Ol
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
              E-posta
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
            <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
              En az 8 karakter, 1 büyük harf, 1 küçük harf, 1 sayı ve 1 sembol
            </p>
          </div>
          <div>
            <label style={{ fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "4px" }}>
              Şifre Tekrarı
            </label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
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
            Kayıt Ol
          </button>
          <p style={{ textAlign: "center", fontSize: "14px", color: "#6b7280" }}>
            Zaten hesabınız var mı?{" "}
            <Link to="/login" style={{ color: "#6366f1", textDecoration: "none" }}>
              Giriş Yap
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;



