import { useState } from "react";

function LandInfo({ setPage }) {
  // 1. State untuk menampung data input
  const [formData, setFormData] = useState({
    landName: "",
    landType: "",
    landSize: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    country: "",
    commodity: "",
    description: ""
  });

  // 2. State untuk melacak kolom mana yang error
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {};
    
    const requiredFields = [
      "landName", "landType", "landSize", "address", 
      "city", "province", "zipCode", "country"
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        tempErrors[field] = true;
      }
    });

    // Validasi Angka untuk Luas Lahan
    if (formData.landSize && isNaN(formData.landSize)) {
      tempErrors.landSize = true;
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      console.log("Data Berhasil Disimpan:", formData);
      setPage("home"); 
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal land-modal">
        <button className="close-btn" onClick={() => setPage("home")}>✕</button>
        
        <h2 className="auth-title">Informasi Lahan</h2>
        <p className="auth-subtitle">Bantu kami memberikan layanan yang lebih sesuai dengan kebutuhan Anda.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          
          {}
          <h4 className="section-title">Informasi Dasar</h4>
          <label>Nama Lahan <span className="red">*</span></label>
          <div className={`input-group ${errors.landName ? "error-border" : ""}`}>
            <span className="icon">📧</span>
            <input 
              type="text" 
              name="landName"
              placeholder="Masukkan nama lahan" 
              value={formData.landName}
              onChange={handleChange}
            />
          </div>

          <div className="input-row">
            <div className="input-field">
              <label>Tipe Lahan <span className="red">*</span></label>
              <div className={`input-group ${errors.landType ? "error-border" : ""}`}>
                <input 
                  type="text" 
                  name="landType"
                  placeholder="Lahan" 
                  value={formData.landType}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-field">
              <label>Luas Lahan <span className="red">*</span></label>
              <div className={`input-group ${errors.landSize ? "error-border" : ""}`}>
                <input 
                  type="text" 
                  name="landSize"
                  placeholder="Luas dalam Hektar" 
                  value={formData.landSize}
                  onChange={handleChange}
                />
              </div>
              {errors.landSize && formData.landSize && isNaN(formData.landSize) && (
                <p style={{ color: "#ff4d4d", fontSize: "10px", marginTop: "5px", fontWeight: "bold" }}>Harus berupa angka</p>
              )}
            </div>
          </div>

          {}
          <h4 className="section-title">Lokasi</h4>
          <label>Alamat <span className="red">*</span></label>
          <div className={`input-group ${errors.address ? "error-border" : ""}`}>
            <span className="icon">📞</span>
            <input 
              type="text" 
              name="address"
              placeholder="Masukkan alamat lengkap" 
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="input-row">
            <div className="input-field">
              <label>Kota <span className="red">*</span></label>
              <div className={`input-group ${errors.city ? "error-border" : ""}`}>
                <input 
                  type="text" 
                  name="city"
                  placeholder="Kota" 
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-field">
              <label>Provinsi <span className="red">*</span></label>
              <div className={`input-group ${errors.province ? "error-border" : ""}`}>
                <input 
                  type="text" 
                  name="province"
                  placeholder="Provinsi" 
                  value={formData.province}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="input-row">
            <div className="input-field">
              <label>Kode Pos <span className="red">*</span></label>
              <div className={`input-group ${errors.zipCode ? "error-border" : ""}`}>
                <input 
                  type="text" 
                  name="zipCode"
                  placeholder="Kode Pos" 
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-field">
              <label>Negara <span className="red">*</span></label>
              <div className={`input-group ${errors.country ? "error-border" : ""}`}>
                <input 
                  type="text" 
                  name="country"
                  placeholder="Negara" 
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {}
          <h4 className="section-title">Operasional Lahan</h4>
          <label>Komoditas Utama</label>
          <div className="input-group">
            <input 
              type="text" 
              name="commodity"
              placeholder="Contoh: Padi, Jagung" 
              value={formData.commodity}
              onChange={handleChange}
            />
          </div>

          <label>Deskripsi Tambahan</label>
          <div className="input-group textarea-group">
            <textarea 
              name="description"
              placeholder="Ceritakan sedikit tentang lahan Anda..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="info-box">
            <p>Informasi ini membantu pemilik alat memahami kebutuhan Anda sehingga dapat memberikan layanan yang lebih sesuai.</p>
          </div>

          <div className="btn-group-row">
            <button type="button" className="btn-outline" onClick={() => setPage("home")}>Lewati Sekarang</button>
            <button type="submit" className="btn-submit">Simpan Informasi Lahan</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LandInfo;