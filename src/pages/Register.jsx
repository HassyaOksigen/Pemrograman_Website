import Navbar from "../components/Navbar";
import "../styles/Auth.css"; // Tambahkan baris ini

function Register({ setPage }) {
  return (
    <div className="auth-container">
      <Navbar setPage={setPage} />
      <div className="auth-overlay">
        <div className="auth-card auth-card--large">
          <button className="close-btn" onClick={() => setPage("home")}>
            ✕
          </button>
          <h2>Daftar</h2>
          <p>Bergabung dengan Tandoor</p>

          <form>
            <div className="form-row">
              <div>
                <label>Nama Depan *</label>
                <input type="text" placeholder="Nama" />
              </div>
              <div>
                <label>Nama Belakang *</label>
                <input type="text" placeholder="Nama" />
              </div>
            </div>

            <label>Email *</label>
            <input type="email" placeholder="Masukkan email Anda" />

            <label>No. Telepon *</label>
            <input type="tel" placeholder="Masukkan nomor telepon" />

            <label>Katasandi *</label>
            <input type="password" placeholder="Buat kata sandi" />
            <small>Minimal 8 karakter</small>

            <label>Konfirmasi Kata Sandi *</label>
            <input type="password" placeholder="Masukkan kata sandi" />

            <button
              type="button"
              className="btn btn--primary btn--full"
              onClick={() => setPage("land-info")}
            >
              Daftar
            </button>
          </form>

          <div className="auth-divider">atau</div>
          <p>
            Sudah punya akun?{" "}
            <span className="link-text" onClick={() => setPage("login")}>
              Masuk
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
