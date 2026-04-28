// src/pages/RentForm.jsx
import { useState } from "react";
import { supabase } from "../supabaseClient";

function RentForm({ setPage, session, rentData, setRentData }) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const HARGA_PER_HARI = 50000;

  // --- 1. FUNGSI KHUSUS UNTUK RESET DAN TUTUP (Tombol X dan Batal) ---
  const handleForceResetAndClose = () => {
    setRentData({
      startDate: "",
      endDate: "",
      deliveryAddress: "",
      note: "",
      isAgreed: false,
    });
    setPage("equipment-detail");
  };

  // --- 2. FUNGSI UNTUK PINDAH KE TERMS (Tanpa Reset) ---
  const handleGoToTerms = () => {
    setPage("terms");
  };

  const calculateTotalPrice = () => {
    if (!rentData.startDate || !rentData.endDate) return 0;
    const start = new Date(rentData.startDate);
    const end = new Date(rentData.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays * HARGA_PER_HARI;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === "checkbox" ? checked : value;
    const today = new Date().toISOString().split("T")[0];

    if (name === "startDate" && value < today) {
      alert("Tanggal mulai tidak boleh tanggal yang sudah lewat!");
      return;
    }
    
    if (name === "endDate" && rentData.startDate && value < rentData.startDate) {
      alert("Tanggal selesai tidak boleh lebih awal dari tanggal mulai.");
      return;
    }

    setRentData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempErrors = {};

    if (!rentData.startDate) tempErrors.startDate = true;
    if (!rentData.endDate) tempErrors.endDate = true;
    if (!rentData.deliveryAddress) tempErrors.deliveryAddress = true;
    if (!rentData.isAgreed) tempErrors.isAgreed = true;

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      setLoading(true);
      try {
        const userId = session?.user?.id;
        const firstName = session?.user?.user_metadata?.first_name || "User";

        if (!userId) throw new Error("Sesi tidak ditemukan.");

        // GUNAKAN .insert() AGAR SELALU JADI DATA BARU DI SUPABASE
        const { error } = await supabase.from("sewa").insert([
          {
            user_id: userId,
            nama_penyewa: firstName,
            tanggal_mulai: rentData.startDate,
            tanggal_selesai: rentData.endDate,
            alamat_pengantaran: rentData.deliveryAddress,
            catatan_tambahan: rentData.note,
            alat_disewa: "John Deere 5075E Tractor",
            status: "Menunggu Konfirmasi",
            total_harga: calculateTotalPrice(),
          },
        ]);

        if (error) throw error;
        setPage("payment");
      } catch (err) {
        alert("Gagal memproses: " + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const firstName = session?.user?.user_metadata?.first_name || "User";
  const userEmail = session?.user?.email || "";

  return (
    <div className="auth-overlay">
      <div className="auth-modal rent-modal">
        {/* KLIK X AKAN RESET DATA */}
        <button className="close-btn" onClick={handleForceResetAndClose} disabled={loading}>✕</button>

        <h2 className="auth-title">Formulir Pengajuan Sewa</h2>
        <p className="auth-subtitle">John Deere 5075E Tractor</p>

        <div style={{ background: '#eef5f0', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', border: '1px dashed #1a4d2e', marginTop: '15px' }}>
          <span style={{ fontSize: '14px', color: '#666' }}>Estimasi Biaya Sewa: </span>
          <strong style={{ fontSize: '18px', color: '#1a4d2e' }}>
            Rp {calculateTotalPrice().toLocaleString('id-ID')}
          </strong>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-section-header">
            <h3 style={{ fontSize: "16px", marginBottom: "10px", color: "#1a4d2e", fontWeight: '600' }}>
              Informasi Penyewa
            </h3>
          </div>

          <div className="user-info-statis" style={{ background: "#f8faf9", padding: "15px", borderRadius: "8px", marginBottom: "20px", border: "1px solid #e0e6e2" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <span style={{ color: "#666", fontSize: "14px" }}>Nama:</span>
              <span style={{ fontWeight: "600", fontSize: "14px" }}>{firstName}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#666", fontSize: "14px" }}>Email:</span>
              <span style={{ fontWeight: "600", fontSize: "14px" }}>{userEmail}</span>
            </div>
          </div>

          <hr className="form-divider" style={{ margin: "20px 0", border: "0", borderTop: "1px solid #eee" }} />

          <div className="input-field">
            <label>Tanggal Mulai Sewa <span className="red">*</span></label>
            <div className={`input-group ${errors.startDate ? "error-border" : ""}`}>
              <input type="date" name="startDate" value={rentData.startDate} onChange={handleChange} disabled={loading} />
            </div>
          </div>

          <div className="input-field">
            <label>Tanggal Selesai Sewa <span className="red">*</span></label>
            <div className={`input-group ${errors.endDate ? "error-border" : ""}`}>
              <input type="date" name="endDate" value={rentData.endDate} onChange={handleChange} disabled={loading} />
            </div>
          </div>

          <div className="input-field">
            <label>Alamat Pengantaran <span className="red">*</span></label>
            <div className={`input-group ${errors.deliveryAddress ? "error-border" : ""}`}>
              <textarea name="deliveryAddress" placeholder="Jl. Indah..." value={rentData.deliveryAddress} onChange={handleChange} rows="2" disabled={loading} />
            </div>
          </div>

          <div className="input-field">
            <label>Catatan Tambahan (Opsional)</label>
            <div className="input-group">
              <input type="text" name="note" placeholder="Contoh: Kirim sebelum jam 9 Pagi" value={rentData.note} onChange={handleChange} disabled={loading} />
            </div>
          </div>

          <div className="terms-checkbox" style={{ marginTop: "15px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <input type="checkbox" name="isAgreed" id="isAgreed" checked={rentData.isAgreed} onChange={handleChange} style={{ marginTop: "4px" }} disabled={loading} />
            <label htmlFor="isAgreed" style={{ fontSize: "12px", lineHeight: "1.4", color: errors.isAgreed ? 'red' : '#555' }}>
              Saya menyetujui <span className="green-link" onClick={handleGoToTerms} style={{ cursor: "pointer", fontWeight: 'bold' }}>Syarat dan Ketentuan</span> dan memahami bahwa pembayaran diperlukan sebelum alat dikirim.
            </label>
          </div>

          <div className="form-actions" style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            {/* KLIK BATAL AKAN RESET DATA */}
            <button 
              type="button" 
              className="btn-cancel" 
              onClick={handleForceResetAndClose} 
              disabled={loading} 
              style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #ddd", background: "white" }}
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="btn-submit" 
              disabled={loading} 
              style={{ flex: 3, padding: "12px", borderRadius: "8px", border: "none", background: loading ? "#ccc" : "#1a4d2e", color: "white", fontWeight: "600" }}
            >
              {loading ? "Mengirim..." : "Lanjut ke Pembayaran"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RentForm;