// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../supabaseClient";
import peralatanImg from "../assets/peralatan.png";

function Dashboard({ setPage, currentPage, session, setEditLandData }) {
  const [activeTab, setActiveTab] = useState("my-rentals");
  const [lands, setLands] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const userId = session?.user?.id;
      if (!userId) return;

      if (activeTab === "profile") {
        const { data, error } = await supabase
          .from("lahan")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });
        if (error) throw error;
        setLands(data);
      } else {
        const { data, error } = await supabase
          .from("sewa")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });
        if (error) throw error;
        setRequests(data);
      }
    } catch (err) {
      console.error("Gagal mengambil data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, session]);

  const handleDeleteLand = async (landId, landName) => {
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus "${landName}"?`);
    if (!confirmDelete) return;
    try {
      const { error } = await supabase.from("lahan").delete().eq("id", landId);
      if (error) throw error;
      setLands(lands.filter((land) => land.id !== landId));
      alert("Lahan berhasil dihapus");
    } catch (err) {
      alert("Gagal menghapus: " + err.message);
    }
  };

  const handleCancelRequest = async (requestId) => {
    const confirmCancel = window.confirm("Apakah Anda yakin ingin membatalkan permintaan ini?");
    if (!confirmCancel) return;
    try {
      const { error } = await supabase.from("sewa").delete().eq("id", requestId);
      if (error) throw error;
      setRequests(requests.filter((req) => req.id !== requestId));
      alert("Permintaan berhasil dibatalkan");
    } catch (err) {
      alert("Gagal membatalkan: " + err.message);
    }
  };

  const handleEditLand = (land) => {
    setEditLandData(land);
    setPage("landinfo");
  };

  const calculateDays = (start, end) => {
    const d1 = new Date(start);
    const d2 = new Date(end);
    const diff = Math.abs(d2 - d1);
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  const getDynamicStatus = (req) => {
    if (req.status === "Disetujui") {
      const updatedAt = new Date(req.updated_at);
      const now = new Date();
      const diffInMinutes = (now - updatedAt) / (1000 * 60);
      if (diffInMinutes < 5) return "Dikirim";
      return "Disetujui";
    }
    return req.status;
  };

  const userData = session?.user?.user_metadata;
  const userEmail = session?.user?.email;

  return (
    <div className="dashboard-page">
      <Navbar setPage={setPage} currentPage="dashboard" session={session} />

      <div className="container">
        <div className="dashboard-header">
          <h2>Dashboard Penyewa</h2>
          <p>Kelola penyewaan alat dan profil Anda</p>
        </div>

        <div className="dashboard-tabs">
          <button className={`tab-btn ${activeTab === "my-rentals" ? "active" : ""}`} onClick={() => setActiveTab("my-rentals")}>🕒 Penyewaan Saya</button>
          <button className={`tab-btn ${activeTab === "requests" ? "active" : ""}`} onClick={() => setActiveTab("requests")}>📋 Permintaan Sewa</button>
          <button className={`tab-btn ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>👤 Profil</button>
        </div>

        {/* --- TAB PENYEWAAN SAYA (Logika Tanggal Otomatis) --- */}
        {activeTab === "my-rentals" && (
          <div className="tab-content">
            <h3 className="section-title-dash">Penyewaan Aktif</h3>
            {/* Menambahkan display flex dan gap untuk jarak antar kartu */}
            <div className="active-rent-grid" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {requests.filter(req => {
                const today = new Date();
                const endDate = new Date(req.tanggal_selesai);
                return (req.status === "Disetujui" || req.status === "Aktif" || req.status === "Dikirim") && endDate >= today;
              }).length > 0 ? (
                requests
                  .filter(req => {
                    const today = new Date();
                    const endDate = new Date(req.tanggal_selesai);
                    return (req.status === "Disetujui" || req.status === "Aktif" || req.status === "Dikirim") && endDate >= today;
                  })
                  .map((req) => (
                    <div className="active-card" key={req.id}>
                      <img src={peralatanImg} alt="alat" className="active-img" />
                      <div className="active-info">
                        <div className="title-status">
                          <h4>{req.alat_disewa}</h4>
                          <span className="badge-active">Aktif</span>
                        </div>
                        <p>{req.tanggal_mulai} sampai {req.tanggal_selesai}</p>
                        <span className="active-price">Rp {req.total_harga?.toLocaleString("id-ID")}</span>
                      </div>
                    </div>
                  ))
              ) : (
                <p>Tidak ada penyewaan aktif.</p>
              )}
            </div>

            <h3 className="section-title-dash" style={{ marginTop: "40px" }}>Riwayat Penyewaan</h3>
            <div className="history-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {requests.filter(req => {
                const today = new Date();
                const endDate = new Date(req.tanggal_selesai);
                return req.status === "Selesai" || ((req.status === "Disetujui" || req.status === "Aktif") && endDate < today);
              }).length > 0 ? (
                requests
                  .filter(req => {
                    const today = new Date();
                    const endDate = new Date(req.tanggal_selesai);
                    return req.status === "Selesai" || ((req.status === "Disetujui" || req.status === "Aktif") && endDate < today);
                  })
                  .map((req) => (
                    <div className="history-card" key={req.id}>
                      <h4>{req.alat_disewa}</h4>
                      <p>Selesai — {req.tanggal_selesai} • {calculateDays(req.tanggal_mulai, req.tanggal_selesai)} hari • Rp {req.total_harga?.toLocaleString("id-ID")}</p>
                    </div>
                  ))
              ) : (
                <p>Belum ada riwayat penyewaan.</p>
              )}
            </div>
          </div>
        )}

        {/* --- TAB PERMINTAAN SEWA --- */}
        {activeTab === "requests" && (
          <div className="tab-content">
            <div className="section-header-inline">
              <h3 className="section-title-dash">Permintaan Penyewaan</h3>
              <button className="btn-new-request" onClick={() => setPage("equipment")}>Permintaan Baru</button>
            </div>
            {loading ? <p>Memuat...</p> : (
              <div className="request-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {requests
                  .filter(r => r.status === "pending" || r.status === "Menunggu Konfirmasi" || r.status === "Ditolak")
                  .map((req) => {
                    const currentStatus = getDynamicStatus(req);
                    return (
                      <div className="request-card" key={req.id}>
                        <img src={peralatanImg} alt="alat" className="active-img" />
                        <div className="request-info">
                          <div className="title-status">
                            <h4>{req.alat_disewa}</h4>
                            <span className={`badge-${currentStatus === "Menunggu Konfirmasi" || currentStatus === "pending" ? "pending" : currentStatus === "Ditolak" ? "rejected" : "active"}`}>
                              {currentStatus}
                            </span>
                          </div>
                          <p>Diajukan untuk {req.tanggal_mulai} • Durasi {calculateDays(req.tanggal_mulai, req.tanggal_selesai)} hari</p>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                            <span className="active-price">Rp {req.total_harga?.toLocaleString("id-ID") || "0"}</span>
                            {currentStatus === "Menunggu Konfirmasi" || currentStatus === "pending" ? (
                              <div className="request-actions">
                                <button className="btn-cancel" onClick={() => handleCancelRequest(req.id)}>Batalkan Permintaan</button>
                              </div>
                            ) : currentStatus === "Ditolak" ? (
                              <div className="status-rejected-text">
                                <span style={{ color: "#d32f2f", fontWeight: "600", fontSize: "14px" }}>Permintaan Tidak Disetujui</span>
                              </div>
                            ) : (
                              <span style={{ fontWeight: "bold", color: "#1a4d2e" }}>SHP-00{req.id}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* --- TAB PROFIL --- */}
        {activeTab === "profile" && (
          <div className="profile-tab-content">
            <div className="profile-info-card-horizontal">
              <h3 className="info-title-green">Informasi</h3>
              <div className="info-grid-horizontal">
                <div className="info-item-flex">
                  <span className="info-icon-green">👤</span>
                  <div className="info-detail">
                    <strong>{userData?.first_name} {userData?.last_name}</strong>
                    <p>Penyewa Alat</p>
                  </div>
                </div>
                <div className="info-item-flex">
                  <span className="info-icon-green">📞</span>
                  <div className="info-detail">
                    <strong>{userData?.phone || "-"}</strong>
                    <p>No. HP</p>
                  </div>
                </div>
                <div className="info-item-flex">
                  <span className="info-icon-green">✉️</span>
                  <div className="info-detail">
                    <strong>{userEmail}</strong>
                    <p>Email</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lahan-section-header">
              <h3 className="info-title-green">Informasi Lahan</h3>
              <button className="btn-tambah-lahan" onClick={() => { if (typeof setEditLandData === "function") setEditLandData(null); setPage("landinfo"); }}>Tambah Lahan</button>
            </div>

            {loading ? <p>Memuat lahan...</p> : (
              <div className="lahan-grid-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {lands.map((land) => (
                  <div className="lahan-mini-card" key={land.id}>
                    <div className="lahan-card-header">
                      <div className="lahan-name-box">
                        <h4>{land.nama_lahan}</h4>
                        <span className="lahan-size-badge">{land.luas_lahan} Hektar</span>
                      </div>
                      <div className="lahan-actions-icons">
                        <button className="icon-edit-blue" onClick={() => handleEditLand(land)}>✏️</button>
                        <button className="icon-delete-red" onClick={() => handleDeleteLand(land.id, land.nama_lahan)}>🗑️</button>
                      </div>
                    </div>
                    <div className="lahan-card-body">
                      <div className="lahan-detail-row">
                        <div className="detail-col"><span>Tanaman Utama:</span><p>{land.komoditas_utama || "-"}</p></div>
                        <div className="detail-col"><span>Jenis Lahan:</span><p>{land.tipe_lahan || "-"}</p></div>
                      </div>
                      <hr className="divider-lahan" />
                      <div className="lahan-location-pin"><span>📍</span> {land.alamat || "Alamat tidak tersedia"}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="footer-green-dash"></div>
    </div>
  );
}

export default Dashboard;