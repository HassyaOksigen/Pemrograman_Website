import { useState } from "react";

function Login({ setPage }) {
  // 1. State untuk input dan fitur-fitur baru
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 2. Validasi Sederhana: Contoh jika email tidak mengandung '@' atau password kurang dari 6
    if (!email.includes("@") || password.length < 6) {
      setError(true);
      return; 
    }

    setError(false);
    setPage("landinfo"); 
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={() => setPage("home")}>✕</button>
        
        <h2 className="auth-title">Masuk</h2>
        <p className="auth-subtitle">Selamat datang kembali di Tandoor</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Email</label>
          {}
          <div className={`input-group ${error && !email.includes("@") ? "error-border" : ""}`}>
            <span className="icon">📧</span>
            <input 
              type="email" 
              placeholder="Masukkan email Anda" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <label>Password</label>
          <div className={`input-group ${error && password.length < 6 ? "error-border" : ""}`}>
            <span className="icon">🔒</span>
            <input 
              type={showPassword ? "text" : "password"} // Logika ganti tipe input
              placeholder="Masukkan kata sandi" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            {}
            <span 
              className="eye-icon" 
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? "👁️‍🗨️" : "👁️"}
            </span>
          </div>

          {}
          {error && (
            <p style={{ color: "#ff4d4d", fontSize: "12px", marginTop: "-10px", fontWeight: "bold" }}>
              Email atau password tidak sesuai ketentuan.
            </p>
          )}

          <div className="auth-extra">
            <label className="remember-me">
              <input type="checkbox" /> Ingat saya
            </label>
            <span className="forgot-pw">Lupa kata sandi?</span>
          </div>

          <button type="submit" className="btn-submit">Masuk</button>
        </form>

        <div className="auth-divider">
          <hr /> <span>atau</span> <hr />
        </div>

        <p className="auth-footer">
          Belum punya akun? <span className="green-link" onClick={() => setPage("register")}>Daftar</span>
        </p>
      </div>
    </div>
  );
}

export default Login;