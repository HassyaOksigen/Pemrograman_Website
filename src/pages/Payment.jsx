// src/pages/Payment.jsx
import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";

function Payment({ setPage, session, rentData, setRentData }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [latestRent, setLatestRent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fileInputRef = useRef(null);
  const deliveryFee = 100000; // Biaya Pengiriman Tetap

  useEffect(() => {
    const fetchLatestRental = async () => {
      try {
        const userId = session?.user?.id;
        if (!userId) return;

        const { data, error } = await supabase
          .from("sewa")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(1);

        if (data && data.length > 0) {
          setLatestRent(data[0]);
        }
      } catch (err) {
        console.error("Gagal memuat data sewa:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestRental();
  }, [session]);

  const calculateDuration = () => {
    const start = rentData?.startDate || latestRent?.tanggal_mulai;
    const end = rentData?.endDate || latestRent?.tanggal_selesai;
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const rentalPrice = latestRent?.total_harga || 0;
  const grandTotal = rentalPrice + deliveryFee;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("Ukuran file maksimal 5MB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleConfirm = async () => {
    if (!file) {
      alert("Harap unggah bukti pembayaran.");
      return;
    }

    setIsUploading(true);
    try {
      const userId = session?.user?.id;
      const fileName = `${userId}-${Date.now()}.${file.name.split(".").pop()}`;

      const { error: uploadError } = await supabase.storage
        .from("bukti-transfer")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("bukti-transfer")
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from("sewa")
        .update({ 
          total_harga: grandTotal, // Update total akhir ke DB
          bukti_pembayaran: publicUrlData.publicUrl,
          status: "Menunggu Konfirmasi" 
        })
        .eq("id", latestRent?.id);

      if (updateError) throw updateError;

      setRentData({ startDate: "", endDate: "", deliveryAddress: "", note: "", isAgreed: false });
      setPage("success");
    } catch (err) {
      alert("Kesalahan: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) return <div className="auth-overlay">Memuat data...</div>;

  return (
    <div className="auth-overlay">
      <div className="auth-modal payment-confirm-modal">
        <button className="close-btn" onClick={() => setPage("rent-form")}>✕</button>

        <h2 className="auth-title">Konfirmasi Pembayaran</h2>
        <p className="auth-subtitle">{latestRent?.alat_disewa || "John Deere 5075E Tractor"}</p>

        <div className="payment-content">
          <div className="summary-box">
            <h4>Ringkasan Pemesanan</h4>
            <div className="summary-item">
              <span>Nama:</span> <strong>{session?.user?.user_metadata?.first_name}</strong>
            </div>
            <div className="summary-item">
              <span>Email:</span> <strong>{session?.user?.email}</strong>
            </div>
            <div className="summary-item">
              <span>Durasi Sewa:</span> <strong>{calculateDuration()} Hari</strong>
            </div>
            <div className="summary-item">
              <span>Tanggal Mulai:</span> <strong>{rentData?.startDate || latestRent?.tanggal_mulai}</strong>
            </div>
            <div className="summary-item">
              <span>Tanggal Selesai:</span> <strong>{rentData?.endDate || latestRent?.tanggal_selesai}</strong>
            </div>
            
            {/* DETAIL BIAYA PENGIRIMAN */}
            <div className="summary-item" style={{ color: '#1a4d2e', marginTop: '5px' }}>
              <span>Biaya Pengiriman:</span> <strong>Rp {deliveryFee.toLocaleString('id-ID')}</strong>
            </div>
            
            <hr />
            <div className="total-row">
              <span>Total Biaya:</span>
              <span className="total-price">Rp {grandTotal.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <div className="instruction-box">
            <div className="instruction-header">
              <span className="info-icon">ⓘ</span>
              <strong>Petunjuk Pembayaran</strong>
            </div>
            <ol>
              <li>Silakan transfer total pembayaran ke rekening berikut:</li>
              <li>Bank: Tandoor Bank</li>
              <li>Nomor Rekening: 1234-5678-9012</li>
              <li>Nama Rekening: Farm Equipment Rentals</li>
              <li>Unggah bukti transfer atau screenshot transaksi pada kolom di bawah.</li>
            </ol>
          </div>

          <div className="input-field">
            <label>ID Transaksi / Nomor Referensi (Opsional)</label>
            <div className="input-group">
              <input type="text" placeholder="Masukkan nomor referensi transaksi" />
            </div>
          </div>

          <div className="upload-form">
            <label>Unggah Bukti Pembayaran <span className="red">*</span></label>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange} 
              accept="image/*" 
            />
            
            {!file ? (
              <div className="upload-area" onClick={() => fileInputRef.current.click()}>
                <div className="upload-icon">📤</div>
                <p><span>Klik untuk mengunggah</span> atau tarik file ke area ini</p>
                <small>PNG, JPG (maks. 5MB)</small>
              </div>
            ) : (
              <div className="uploaded-file-box">
                <div className="file-info">
                  <div className="file-icon-check">✅</div>
                  <div className="file-detail">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">{(file.size / 1024).toFixed(2)} KB</span>
                  </div>
                </div>
                <button className="btn-remove-file" onClick={() => setFile(null)}>Hapus File</button>
              </div>
            )}
          </div>

          <div className="warning-note">
            Permintaan penyewaan Anda akan ditinjau setelah pembayaran diverifikasi. 
            Alat tidak akan dikirim sebelum pembayaran berhasil diverifikasi.
          </div>

          <div className="btn-group-row">
            <button className="btn-outline" onClick={() => setPage("rent-form")} disabled={isUploading}>
              Kembali
            </button>
            <button 
              className="btn-submit btn-confirm" 
              onClick={handleConfirm} 
              disabled={isUploading}
            >
              {isUploading ? "Mengirim..." : "Konfirmasi & Kirim"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;