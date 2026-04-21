import { useState } from "react";

function RentForm({ setPage }) {
  // 1. State untuk data form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    farmName: "",
    duration: "",
    startDate: "",
    endDate: "",
    address: "",
    isAgreed: false
  });

  // 2. State untuk melacak error
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {};

    const requiredFields = [
      "firstName", "lastName", "email", "phone", 
      "duration", "startDate", "endDate", "address"
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        tempErrors[field] = true;
      }
    });

    const phoneRegex = /^0[0-9]{9,13}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      tempErrors.phone = true;
    }

    if (!formData.isAgreed) {
      tempErrors.isAgreed = true;
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      console.log("Pengajuan Sewa Berhasil:", formData);
      setPage("payment");
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal rent-modal">
        <button className="close-btn" onClick={() => setPage("equipment-detail")}>✕</button>

        <h2 className="auth-title">Pengajuan Sewa</h2>
        <p className="auth-subtitle">John Deere 5075E Tractor</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          
          <h4 className="section-title-small">Informasi Penyewa</h4>
          <div className="input-row">
            <div className="input-field">
              <label>Nama Depan <span className="red">*</span></label>
              <div className={`input-group ${errors.firstName ? "error-border" : ""}`}>
                <input 
                  type="text" 
                  name="firstName"
                  placeholder="Nama" 
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-field">
              <label>Nama Belakang <span className="red">*</span></label>
              <div className={`input-group ${errors.lastName ? "error-border" : ""}`}>
                <input 
                  type="text" 
                  name="lastName"
                  placeholder="Nama" 
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="input-row">
            <div className="input-field">
              <label>Email <span className="red">*</span></label>
              <div className={`input-group ${errors.email ? "error-border" : ""}`}>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-field">
              <label>No. HP <span className="red">*</span></label>
              <div className={`input-group ${errors.phone ? "error-border" : ""}`}>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Contoh: 0812345" 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <label>Nama Pertanian / Usaha</label>
          <div className="input-group">
            <input 
              type="text" 
              name="farmName"
              placeholder="Nama Pertanian" 
              value={formData.farmName}
              onChange={handleChange}
            />
          </div>

          <h4 className="section-title-small">Detail Sewa</h4>
          <label>Durasi Sewa <span className="red">*</span></label>
          <div className={`input-group ${errors.duration ? "error-border" : ""}`}>
            <input 
              type="text" 
              name="duration"
              placeholder="Jumlah Hari" 
              value={formData.duration}
              onChange={handleChange}
            />
          </div>

          <div className="input-row">
            <div className="input-field">
              <label>Tanggal Mulai <span className="red">*</span></label>
              <div className={`input-group ${errors.startDate ? "error-border" : ""}`}>
                <input 
                  type="date" 
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-field">
              <label>Tanggal Selesai <span className="red">*</span></label>
              <div className={`input-group ${errors.endDate ? "error-border" : ""}`}>
                <input 
                  type="date" 
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <label>Alamat Pengantaran <span className="red">*</span></label>
          <div className={`input-group ${errors.address ? "error-border" : ""}`}>
            <input 
              type="text" 
              name="address"
              placeholder="Jl. Indah" 
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="estimation-box">
            <div className="est-text">
              <span className="est-label">Estimasi Harga</span>
              <span className="est-sub">Per Hari</span>
            </div>
            <span className="est-price">Rp 1.000</span>
          </div>

          <div className={`agreement-row ${errors.isAgreed ? "error-text-bold" : ""}`}>
            <input 
              type="checkbox" 
              id="agree" 
              name="isAgreed"
              checked={formData.isAgreed}
              onChange={handleChange}
            />
            <label htmlFor="agree">
              Saya menyetujui{" "}
              <span
                className="green-text"
                onClick={() => setPage("terms")}
                style={{ cursor: "pointer", fontWeight: "600", textDecoration: "underline" }}
              >
                Syarat dan Ketentuan
              </span>{" "}
              dan memahami bahwa pembayaran diperlukan sebelum alat dikirim.
            </label>
          </div>

          <div className="btn-group-row">
            <button
              type="button"
              className="btn-outline"
              onClick={() => setPage("equipment-detail")}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn-submit"
            >
              Lanjut ke Pembayaran
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RentForm;