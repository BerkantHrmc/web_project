import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const API_BASE = "http://localhost:3000";
const PRIMARY_COLOR = "#6366f1";

function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [profileTypes, setProfileTypes] = useState([]);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileTypeId: "",
    photo: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAdmin, user } = useAuth();

  useEffect(() => {
    fetchProfiles();
    fetchProfileTypes();
  }, []);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get(`${API_BASE}/profiles`);
      setProfiles(res.data);
    } catch (error) {
      console.error("Profiller yüklenemedi:", error);
    }
  };

  const fetchProfileTypes = async () => {
    try {
      const res = await axios.get(`${API_BASE}/profileTypes`);
      setProfileTypes(res.data);
    } catch (error) {
      console.error("Profil türleri yüklenemedi:", error);
    }
  };

  const resetForm = () => {
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      profileTypeId: "",
      photo: null,
    });
    setEditingId(null);
    setErrorMsg("");
  };

  const openCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEdit = (profile) => {
    setForm({
      username: profile.username,
      email: profile.email,
      password: "",
      confirmPassword: "",
      profileTypeId: profile.profileType?.id?.toString() ?? "",
      photo: null,
    });
    setEditingId(profile.id);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const fd = new FormData();
      fd.append("username", form.username);
      fd.append("email", form.email);

      if (form.password) fd.append("password", form.password);
      if (form.confirmPassword) fd.append("confirmPassword", form.confirmPassword);

      // profileTypeId'yi her zaman gönder (düzenleme için kritik)
      console.log("Frontend - form.profileTypeId:", form.profileTypeId, typeof form.profileTypeId);
      
      if (form.profileTypeId && form.profileTypeId !== "" && form.profileTypeId !== "undefined" && form.profileTypeId !== "null") {
        const profileTypeIdStr = form.profileTypeId.toString();
        fd.append("profileTypeId", profileTypeIdStr);
        console.log("✅ Frontend - profileTypeId appended:", profileTypeIdStr);
      } else {
        console.log("❌ Frontend - profileTypeId is empty or invalid");
      }
      
      // FormData içeriğini kontrol et
      console.log("FormData entries:");
      for (const [key, value] of fd.entries()) {
        console.log(key, ":", value);
      }

      if (form.photo) fd.append("photo", form.photo);

      if (editingId === null) {
        await axios.post(`${API_BASE}/profiles`, fd);
      } else {
        await axios.patch(`${API_BASE}/profiles/${editingId}`, fd);
      }

      setIsModalOpen(false);
      resetForm();
      fetchProfiles();
    } catch (err) {
      const msg = err.response?.data?.message || "Bir hata oluştu.";
      setErrorMsg(Array.isArray(msg) ? msg.join(" | ") : msg);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu profili silmek istediğinizden emin misiniz?")) return;
    try {
      await axios.delete(`${API_BASE}/profiles/${id}`);
      fetchProfiles();
    } catch (error) {
      alert("Profil silinemedi: " + (error.response?.data?.message || "Bir hata oluştu"));
    }
  };

  const handleSelectChange = (e) => {
    setForm({ ...form, profileTypeId: e.target.value });
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
            {isAdmin() ? "Profil Yönetimi" : "Kullanıcılar"}
          </h1>

          {isAdmin() && (
            <button
              onClick={openCreate}
              style={{
                backgroundColor: "green",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              + Yeni Profil Oluştur
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
          {profiles.length === 0 ? (
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
              Kayıtlı profil bulunmamaktadır.
            </div>
          ) : (
            profiles.map((p) => (
              <div
                key={p.id}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  {p.photo && (
                    <img
                      src={p.photo}
                      alt={p.username}
                      style={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: `2px solid ${PRIMARY_COLOR}`,
                        marginRight: "15px",
                      }}
                    />
                  )}
                  <div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "#1f2937" }}>{p.username}</div>
                    <div style={{ fontSize: "14px", color: PRIMARY_COLOR, fontWeight: "600" }}>
                      {p.profileType?.name || "Belirtilmemiş"}
                    </div>
                  </div>
                </div>

                {[
                  { label: "ID", value: p.id },
                  { label: "E-posta", value: p.email },
                ].map((item) => (
                  <div key={item.label} style={{ marginBottom: "12px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#4b5563",
                        display: "block",
                        marginBottom: "2px",
                      }}
                    >
                      {item.label}:
                    </span>
                    <span style={{ fontSize: "16px", color: "#1f2937" }}>{item.value}</span>
                  </div>
                ))}

                {(isAdmin() || (user && user.id === p.id)) && (
                  <div
                    style={{
                      marginTop: "20px",
                      paddingTop: "15px",
                      borderTop: "1px solid #e5e7eb",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() => openEdit(p)}
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
                      onClick={() => handleDelete(p.id)}
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
                {editingId === null ? "Yeni Profil Oluştur" : "Profili Güncelle"}
              </h2>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { label: "Kullanıcı Adı", type: "text", name: "username", required: true },
                  { label: "E-posta", type: "email", name: "email", required: true },
                ].map((field) => (
                  <div key={field.name}>
                    <label style={{ fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "4px" }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={form[field.name]}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                      required={field.required}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #d1d5db",
                        outline: "none",
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "4px" }}>
                    Profil Türü (Yetki) {isAdmin() && <span style={{ color: "#6366f1", fontSize: "12px" }}>(Admin: Yetki değiştirebilir)</span>}
                  </label>
                  <select
                    value={form.profileTypeId}
                    onChange={handleSelectChange}
                    required
                    disabled={!isAdmin() && editingId !== null}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      outline: "none",
                      backgroundColor: (!isAdmin() && editingId !== null) ? "#f3f4f6" : "white",
                      cursor: (!isAdmin() && editingId !== null) ? "not-allowed" : "pointer",
                    }}
                  >
                    <option value="">Seçiniz</option>
                    {profileTypes.map((pt) => (
                      <option key={pt.id} value={pt.id.toString()}>
                        {pt.name}
                      </option>
                    ))}
                  </select>
                  {!isAdmin() && editingId !== null && (
                    <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                      Yetki değiştirmek için Yönetici olmanız gerekir.
                    </p>
                  )}
                </div>

                {[
                  { label: "Şifre", name: "password" },
                  { label: "Şifre Tekrarı", name: "confirmPassword" },
                ].map((field) => (
                  <div key={field.name}>
                    <label style={{ fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "4px" }}>
                      {field.label}{" "}
                      {editingId && (
                        <span style={{ color: "#6b7280", fontWeight: "normal", fontSize: "12px" }}>
                          (Opsiyonel)
                        </span>
                      )}
                    </label>
                    <input
                      type="password"
                      value={form[field.name]}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                      required={editingId === null}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #d1d5db",
                        outline: "none",
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "4px" }}>
                    Fotoğraf
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setForm({ ...form, photo: e.target.files[0] })}
                    required={editingId === null}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      outline: "none",
                      backgroundColor: "white",
                    }}
                  />
                </div>

                {errorMsg && (
                  <p style={{ color: "#ef4444", fontSize: "14px", fontWeight: "500" }}>Hata: {errorMsg}</p>
                )}

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
                      backgroundColor: "green",
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

export default Profiles;

