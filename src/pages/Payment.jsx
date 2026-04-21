// src/pages/Payment.jsx
import { useState } from "react";

function Payment({ setPage }) {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [error, setError] = useState(false);

  const handleConfirm = () => {
    if (!fileUploaded) {
      setError(true); 
    } else {
      setError(false);
      setPage("success"); 
    }
  };

  const handleUploadSimulate = () => {
    setFileUploaded(true);
    setError(false); 
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal payment-confirm-modal">
        <button className="close-btn" onClick={() => setPage("rent-form")}>
          ✕
        </button>

        <h2 className="auth-title">Konfirmasi Pembayaran</h2>
        <p className="auth-subtitle">John Deere 5075E Tractor</p>

        <div className="payment-content">
          {/* Ringkasan Pemesanan */}
          <div className="summary-box">
            <h4>Ringkasan Pemesanan</h4>
            <div className="summary-item">
              <span>Nama:</span> <strong>Jot</strong>
            </div>
            <div className="summary-item">
              <span>Email:</span> <strong>Jontor@gmai.com</strong>
            </div>
            <div className="summary-item">
              <span>Durasi Sewa:</span> <strong>Harian</strong>
            </div>
            <div className="summary-item">
              <span>Tanggal Mulai:</span> <strong>17 Juli 2026</strong>
            </div>
            <div className="summary-item">
              <span>Tanggal Selesai:</span> <strong>20 Juli 2026</strong>
            </div>
            <hr />
            <div className="total-row">
              <span>Total Biaya:</span>
              <span className="total-price">Rp 10.000</span>
            </div>
          </div>

          {/* Instruksi Pembayaran */}
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
              <li>
                Unggah bukti transfer atau screenshot transaksi pada kolom di
                bawah.
              </li>
            </ol>
          </div>

          {/* Form Unggah */}
          <div className="upload-form">
            <label>ID Transaksi / Nomor Referensi (Opsional)</label>
            <div className="input-group">
              <input
                type="text"
                placeholder="Masukkan nomor referensi transaksi"
              />
            </div>

            <label>
              Unggah Bukti Pembayaran <span className="red">*</span>
            </label>

            {!fileUploaded ? (
              <div
                className={`upload-area ${error ? "error-border-dashed" : ""}`}
                onClick={handleUploadSimulate}
              >
                <div className="upload-icon">📤</div>
                <p>
                  <span>Klik untuk mengunggah</span> atau tarik file ke area ini
                </p>
                <small>PNG, JPG, atau PDF (maks. 5MB)</small>
              </div>
            ) : (
              <div className="uploaded-file-box">
                <div className="file-info">
                  <div className="file-icon-check">✅</div>
                  <div className="file-detail">
                    <span className="file-name">payment.png</span>
                    <span className="file-size">20.33 KB</span>
                  </div>
                </div>
                <button
                  className="btn-remove-file"
                  onClick={() => setFileUploaded(false)}
                >
                  Hapus File
                </button>
              </div>
            )}
            {error && (
              <p className="error-text">Harap unggah bukti pembayaran terlebih dahulu.</p>
            )}
          </div>

          <div className="warning-note">
            Permintaan penyewaan Anda akan ditinjau setelah pembayaran
            diverifikasi. Alat tidak akan dikirim sebelum pembayaran berhasil
            diverifikasi.
          </div>

          <div className="btn-group-row">
            <button
              className="btn-outline"
              onClick={() => setPage("rent-form")}
            >
              Kembali
            </button>
            <button
              className="btn-submit btn-confirm"
              onClick={handleConfirm}
            >
              Konfirmasi & Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;