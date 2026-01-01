import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const API_BASE = "http://localhost:3000";

function Films() {
  const [films, setFilms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    year: "",
    posterUrl: "",
    genreIds: [],
  });
  const [editingId, setEditingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchFilms();
    fetchGenres();
  }, []);

  const fetchFilms = async () => {
    try {
      const res = await axios.get(`${API_BASE}/films`);
      setFilms(res.data);
    } catch (error) {
      console.error("Filmler yüklenemedi:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await axios.get(`${API_BASE}/genres`);
      setGenres(res.data);
    } catch (error) {
      console.error("Türler yüklenemedi:", error);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      year: "",
      posterUrl: "",
      genreIds: [],
    });
    setEditingId(null);
    setErrorMsg("");
  };

  const openCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEdit = (film) => {
    setForm({
      title: film.title || "",
      description: film.description || "",
      year: film.year?.toString() || "",
      posterUrl: film.posterUrl || "",
      genreIds: film.genres?.map((g) => g.id) || [],
    });
    setEditingId(film.id);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      // genreIds'i number array'e çevir
      const genreIdsArray = form.genreIds.length > 0 
        ? form.genreIds.map(id => Number(id)).filter(id => !isNaN(id))
        : undefined;

      const data = {
        title: form.title,
        description: form.description || undefined,
        year: form.year ? parseInt(form.year) : undefined,
        posterUrl: form.posterUrl || undefined,
        genreIds: genreIdsArray,
      };

      if (editingId === null) {
        await axios.post(`${API_BASE}/films`, data);
      } else {
        await axios.patch(`${API_BASE}/films/${editingId}`, data);
      }

      setIsModalOpen(false);
      resetForm();
      fetchFilms();
    } catch (err) {
      const msg = err.response?.data?.message || "Bir hata oluştu.";
      const errorText = Array.isArray(msg) ? msg.join(" | ") : msg;
      setErrorMsg(errorText);
      if (err.response?.status === 403 || err.response?.status === 401) {
        // Modal açık kalsın, hata mesajı gösterilsin
      } else {
        setIsModalOpen(false);
        resetForm();
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu filmi silmek istediğinizden emin misiniz?")) return;
    try {
      await axios.delete(`${API_BASE}/films/${id}`);
      fetchFilms();
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Bir hata oluştu";
      if (error.response?.status === 403 || error.response?.status === 401) {
        alert(`Yetki hatası: Film silmek için Yönetici yetkisine sahip olmanız gerekir.\n\n${errorMsg}`);
      } else {
        alert("Film silinemedi: " + errorMsg);
      }
    }
  };

  const handleGenreToggle = (genreId) => {
    const numGenreId = Number(genreId);
    setForm({
      ...form,
      genreIds: form.genreIds.includes(numGenreId)
        ? form.genreIds.filter((id) => Number(id) !== numGenreId)
        : [...form.genreIds, numGenreId],
    });
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
            {isAdmin() ? "Film Yönetimi" : "Filmler"}
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
              + Yeni Film Ekle
            </button>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {films.length === 0 ? (
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
              Kayıtlı film bulunmamaktadır.
            </div>
          ) : (
            films.map((film) => (
              <div
                key={film.id}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  border: "1px solid #e5e7eb",
                }}
              >
                {film.posterUrl && (
                  <img
                    src={film.posterUrl}
                    alt={film.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "15px",
                    }}
                  />
                )}
                <div style={{ fontSize: "18px", fontWeight: "700", color: "#1f2937", marginBottom: "10px" }}>
                  {film.title}
                </div>
                {film.year && (
                  <div style={{ fontSize: "14px", color: "#6366f1", fontWeight: "600", marginBottom: "10px" }}>
                    {film.year}
                  </div>
                )}
                {film.description && (
                  <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "10px" }}>
                    {film.description.length > 100
                      ? film.description.substring(0, 100) + "..."
                      : film.description}
                  </div>
                )}
                {film.genres && film.genres.length > 0 && (
                  <div style={{ marginBottom: "10px" }}>
                    <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>Türler:</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {film.genres.map((genre) => (
                        <span
                          key={genre.id}
                          style={{
                            fontSize: "12px",
                            padding: "4px 8px",
                            background: "#e0e7ff",
                            color: "#6366f1",
                            borderRadius: "4px",
                          }}
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {isAdmin() && (
                  <div style={{ marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #e5e7eb", display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => openEdit(film)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid #f97316",
                        backgroundColor: "white",
                        color: "#f97316",
                        cursor: "pointer",
                        fontWeight: "500",
                        flexGrow: 1,
                      }}
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(film.id)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid #ef4444",
                        backgroundColor: "#ef4444",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "500",
                        flexGrow: 1,
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
                maxWidth: "600px",
                maxHeight: "90vh",
                overflowY: "auto",
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
                {editingId === null ? "Yeni Film Ekle" : "Filmi Güncelle"}
              </h2>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "4px" }}>
                    Başlık *
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
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
                    Açıklama
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows="4"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "4px" }}>
                    Yıl
                  </label>
                  <input
                    type="number"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    min="1888"
                    max="2100"
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
                    Poster URL
                  </label>
                  <input
                    type="url"
                    value={form.posterUrl}
                    onChange={(e) => setForm({ ...form, posterUrl: e.target.value })}
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
                  <label style={{ fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "8px" }}>
                    Türler {genres.length === 0 && <span style={{ color: "#ef4444", fontSize: "12px" }}>(Türler yükleniyor...)</span>}
                  </label>
                  {genres.length === 0 ? (
                    <div style={{ padding: "12px", background: "#f3f4f6", borderRadius: "6px", color: "#6b7280", fontSize: "14px" }}>
                      Henüz tür eklenmemiş. Önce "Türler" sayfasından tür ekleyin.
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {genres.map((genre) => {
                        const isSelected = form.genreIds.includes(Number(genre.id));
                        return (
                          <label
                            key={genre.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                              padding: "8px 12px",
                              borderRadius: "6px",
                              border: isSelected ? "2px solid #6366f1" : "1px solid #d1d5db",
                              background: isSelected ? "#e0e7ff" : "white",
                              transition: "all 0.2s",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleGenreToggle(Number(genre.id))}
                              style={{ marginRight: "8px", cursor: "pointer" }}
                            />
                            {genre.name}
                          </label>
                        );
                      })}
                    </div>
                  )}
                  {form.genreIds.length > 0 && (
                    <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
                      {form.genreIds.length} tür seçildi
                    </p>
                  )}
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

export default Films;



