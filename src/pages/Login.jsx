import Navbar from "../components/Navbar";
import "../styles/Auth.css"; // Tambahkan baris ini

function Login({ setPage }) {
  return (
    <div className="auth-container">
      <Navbar setPage={setPage} />
      <div className="auth-overlay">
        <div className="auth-card">
          <button className="close-btn" onClick={() => setPage("home")}>
            ✕
          </button>
          <h2>Masuk</h2>
          <p>Selamat datang kembali di Tandoor</p>

          <form>
            <label>Email</label>
            <input type="email" placeholder="Masukkan email Anda" />

            <label>Password</label>
            <input type="password" placeholder="Masukkan kata sandi" />

            <div className="auth-options">
              <label>
                <input type="checkbox" /> Ingat saya
              </label>
              <a href="#" className="forgot-link">
                Lupa kata sandi?
              </a>
            </div>

            <button type="submit" className="btn btn--primary btn--full">
              Masuk
            </button>
          </form>

          <div className="auth-divider">atau</div>
          <p>
            Belum punya akun?{" "}
            <span className="link-text" onClick={() => setPage("register")}>
              Daftar
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
