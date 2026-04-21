// src/pages/Dashboard.jsx
import { useState } from "react";
import Navbar from "../components/Navbar";
import peralatanImg from "../assets/peralatan.png";

function Dashboard({ setPage }) {
  // State untuk mengontrol tab mana yang muncul
  const [activeTab, setActiveTab] = useState("my-rentals");

  return (
    <div className="dashboard-page">
      <Navbar setPage={setPage} currentPage="dashboard" />

      <div className="container">
        <div className="dashboard-header">
          <h2>Dashboard Penyewa</h2>
          <p>Kelola penyewaan alat dan profil Anda</p>
        </div>

        {/* Tab Navigasi */}
        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === "my-rentals" ? "active" : ""}`}
            onClick={() => setActiveTab("my-rentals")}
          >
            🕒 Penyewaan Saya
          </button>
          <button 
            className={`tab-btn ${activeTab === "requests" ? "active" : ""}`}
            onClick={() => setActiveTab("requests")}
          >
            📋 Permintaan Sewa
          </button>
          <button 
            className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            👤 Profil
          </button>
        </div>

        {}
        {activeTab === "my-rentals" && (
          <div className="tab-content">
            <h3 className="section-title-dash">Penyewaan Aktif</h3>
            <div className="active-rent-grid">
              <div className="active-card">
                <img src={peralatanImg} alt="tractor" className="active-img" />
                <div className="active-info">
                  <div className="title-status">
                    <h4>John Deere 5075E Tractor</h4>
                    <span className="badge-active">Aktif</span>
                  </div>
                  <p>10-01-2025 sampai 17-01-2025</p>
                  <span className="active-price">10Rp</span>
                </div>
              </div>
            </div>
            <h3 className="section-title-dash">Riwayat</h3>
            <div className="history-list">
               <div className="history-card">
                <h4>Traktor</h4>
                <p>Selesai — 15-12-2024 • 3 hari • Rp 100</p>
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === "requests" && (
          <div className="tab-content">
            <div className="section-header-inline">
              <h3 className="section-title-dash">Permintaan Penyewaan</h3>
              <button className="btn-new-request" onClick={() => setPage("equipment")}>
                Permintaan Baru
              </button>
            </div>
            <div className="request-card">
              <img src={peralatanImg} alt="tractor" className="active-img" />
              <div className="request-info">
                <div className="title-status">
                  <h4>John Deere 5075E Tractor</h4>
                  <span className="badge-pending">Menunggu Persetujuan</span>
                </div>
                <p>Diajukan untuk 20-01-2025 • Durasi 5 hari</p>
                <span className="active-price">10Rp</span>
                <div className="request-actions"><button className="btn-cancel">Batalkan Permintaan</button></div>
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === "profile" && (
          <div className="profile-tab-content">
            <div className="profile-info-card-horizontal">
              <h3 className="info-title-green">Informasi</h3>
              <div className="info-grid-horizontal">
                <div className="info-item-flex">
                  <span className="info-icon-green">👤</span>
                  <div className="info-detail">
                    <strong>John Smith</strong>
                    <p>Pemilik Lahan</p>
                  </div>
                </div>
                <div className="info-item-flex">
                  <span className="info-icon-green">📞</span>
                  <div className="info-detail">
                    <strong>0986666666</strong>
                    <p>No. HP</p>
                  </div>
                </div>
                <div className="info-item-flex">
                  <span className="info-icon-green">✉️</span>
                  <div className="info-detail">
                    <strong>Johns@gmail.com</strong>
                    <p>Email</p>
                  </div>
                </div>
                <div className="info-item-flex">
                  <span className="info-icon-green">📍</span>
                  <div className="info-detail">
                    <strong>Tlogosari</strong>
                    <p>Alamat</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lahan-section-header">
              <h3 className="info-title-green">Informasi Lahan</h3>
              <button className="btn-tambah-lahan" onClick={() => setPage("landinfo")}>
                Tambah Lahan
              </button>
            </div>

            <div className="lahan-grid-cards">
              <div className="lahan-mini-card">
                <div className="lahan-card-header">
                  <div className="lahan-name-box">
                    <h4>Lahan Owo</h4>
                    <span className="lahan-size-badge">19 Hektar</span>
                  </div>
                  <div className="lahan-actions-icons">
                    <button className="icon-edit-blue">✏️</button>
                    <button className="icon-delete-red">🗑️</button>
                  </div>
                </div>
                <div className="lahan-card-body">
                  <div className="lahan-detail-row">
                    <div className="detail-col"><span>Tanaman Utama:</span><p>Sawit</p></div>
                    <div className="detail-col"><span>Jenis Lahan:</span><p>Lahan Baris</p></div>
                  </div>
                  <hr className="divider-lahan" />
                  <div className="lahan-location-pin"><span>📍</span> Jl. Sembo, Zimbabwe Utara, Mars</div>
                </div>
              </div>

              <div className="lahan-mini-card">
                <div className="lahan-card-header">
                  <div className="lahan-name-box">
                    <h4>Lahan Owi</h4>
                    <span className="lahan-size-badge">19 Hektar</span>
                  </div>
                  <div className="lahan-actions-icons">
                    <button className="icon-edit-blue">✏️</button>
                    <button className="icon-delete-red">🗑️</button>
                  </div>
                </div>
                <div className="lahan-card-body">
                  <div className="lahan-detail-row">
                    <div className="detail-col"><span>Tanaman Utama:</span><p>Sawit</p></div>
                    <div className="detail-col"><span>Jenis Lahan:</span><p>Lahan Baris</p></div>
                  </div>
                  <hr className="divider-lahan" />
                  <div className="lahan-location-pin"><span>📍</span> Jl. Sembo, Zimbabwe Utara, Mars</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="footer-green-dash"></div>
    </div>
  );
}

export default Dashboard;