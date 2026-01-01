import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const API_BASE = "http://localhost:3000";

function Genres() {
  const [genres, setGenres] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [editingId, setEditingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAdmin } = useAuth();

  // Admin kontrolü - eğer admin değilse yönlendir
  if (!isAdmin()) {
    return <Navigate to="/profiles" replace />;
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const res = await axios.get(`${API_BASE}/genres`);
      setGenres(res.data);
    } catch (error) {
      console.error("Türler yüklenemedi:", error);
    }
  };

  const resetForm = () => {
    setForm({ name: "" });
    setEditingId(null);
    setErrorMsg("");
  };

  const openCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEdit = (genre) => {
    setForm({ name: genre.name });
    setEditingId(genre.id);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      if (editingId === null) {
        await axios.post(`${API_BASE}/genres`, { name: form.name });
      } else {
        await axios.patch(`${API_BASE}/genres/${editingId}`, { name: form.name });
      }

      setIsModalOpen(false);
      resetForm();
      fetchGenres();
    } catch (err) {
      const msg = err.response?.data?.message || "Bir hata oluştu.";
      setErrorMsg(Array.isArray(msg) ? msg.join(" | ") : msg);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu türü silmek istediğinizden emin misiniz?")) return;
    try {
      await axios.delete(`${API_BASE}/genres/${id}`);
      fetchGenres();
    } catch (error) {
      alert("Tür silinemedi: " + (error.response?.data?.message || "Bir hata oluştu"));
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", padding: "40px 20px" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "white",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div
          style={{
            marginBottom: "32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <h1 style={{ fontSize: "30px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
            {isAdmin() ? "Tür Yönetimi" : "Türler"}
          </h1>
          {isAdmin() && (
            <button
              onClick={openCreate}
              style={{
                backgroundColor: "#6366f1",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              + Yeni Tür Ekle
            </button>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {genres.length === 0 ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "40px",
                color: "#6b7280",
                background: "#f9fafb",
                borderRadius: "12px",
              }}
            >
              Kayıtlı tür bulunmamaktadır.
            </div>
          ) : (
            genres.map((genre) => (
              <div
                key={genre.id}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  border: "1px solid #e5e7eb",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: "#1f2937" }}>{genre.name}</div>
                  {genre.films && (
                    <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
                      {genre.films.length} film
                    </div>
                  )}
                </div>
                {isAdmin() && (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => openEdit(genre)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid #f97316",
                        backgroundColor: "white",
                        color: "#f97316",
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(genre.id)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid #ef4444",
                        backgroundColor: "#ef4444",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      Sil
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 100,
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "480px",
                background: "white",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#1f2937",
                  marginBottom: "24px",
                  borderBottom: "1px solid #e5e7eb",
                  paddingBottom: "10px",
                }}
              >
                {editingId === null ? "Yeni Tür Ekle" : "Türü Güncelle"}
              </h2>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "4px" }}>
                    Tür Adı *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
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

                {errorMsg && <p style={{ color: "#ef4444", fontSize: "14px", fontWeight: "500" }}>Hata: {errorMsg}</p>}

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                    style={{
                      padding: "10px 16px",
                      borderRadius: "8px",
                      border: "1px solid #d1d5db",
                      background: "white",
                      color: "#4b5563",
                      cursor: "pointer",
                      fontWeight: "500",
                    }}
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "10px 16px",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: "#6366f1",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    {editingId ? "Güncelle" : "Oluştur"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Genres;


