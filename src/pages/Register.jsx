import { useState } from "react";

function Register({ setPage }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    // 1. Validasi: Semua kolom wajib diisi
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) tempErrors[key] = true;
    });

    // 2. Validasi Nomor Telepon (Harus awalan 0, minimal 10 angka)
    const phoneRegex = /^0[0-9]{9,13}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      tempErrors.phone = true;
    }

    // 3. Validasi Kata Sandi (Minimal 8 karakter)
    if (formData.password && formData.password.length < 8) {
      tempErrors.password = true;
    }

    // 4. Validasi Konfirmasi Sandi (Harus sama)
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = true;
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      console.log("Registrasi Berhasil:", formData);
      setPage("login"); 
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal register-modal">
        <button className="close-btn" onClick={() => setPage("home")}>✕</button>
        
        <h2 className="auth-title">Daftar</h2>
        <p className="auth-subtitle">Bergabung dengan Tandoor</p>

        <form className="auth-form" onSubmit={handleSubmit}>
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

          <label>Email <span className="red">*</span></label>
          <div className={`input-group ${errors.email ? "error-border" : ""}`}>
            <span className="icon">📧</span>
            <input 
              type="email" 
              name="email"
              placeholder="Masukkan email Anda" 
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <label>No. Telepon <span className="red">*</span></label>
          <div className={`input-group ${errors.phone ? "error-border" : ""}`}>
            <span className="icon">📞</span>
            <input 
              type="tel" 
              name="phone"
              placeholder="Contoh: 08123456789" 
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <label>Katasandi <span className="red">*</span></label>
          <div className={`input-group ${errors.password ? "error-border" : ""}`}>
            <span className="icon">🔒</span>
            <input 
              type={showPassword ? "text" : "password"} 
              name="password"
              placeholder="Buat kata sandi" 
              value={formData.password}
              onChange={handleChange}
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
              {showPassword ? "👁️‍🗨️" : "👁️"}
            </span>
          </div>
          <p className={`input-hint ${errors.password ? "red" : ""}`}>Minimal 8 karakter</p>

          <label>Konfirmasi Kata Sandi <span className="red">*</span></label>
          <div className={`input-group ${errors.confirmPassword ? "error-border" : ""}`}>
            <span className="icon">🔒</span>
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              name="confirmPassword"
              placeholder="Masukkan kata sandi" 
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: "pointer" }}>
              {showConfirmPassword ? "👁️‍🗨️" : "👁️"}
            </span>
          </div>

          <button type="submit" className="btn-submit">Daftar</button>
        </form>

        <div className="auth-divider">
          <hr /> <span>atau</span> <hr />
        </div>

        <p className="auth-footer">
          Sudah punya akun? <span className="green-link" onClick={() => setPage("login")}>Masuk</span>
        </p>
      </div>
    </div>
  );
}

export default Register;