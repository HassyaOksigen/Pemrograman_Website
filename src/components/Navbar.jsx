import "../styles/Navbar.css";
import "../styles/Buttons.css";
import logo from "../assets/logo.png";

function Navbar({ setPage }) {
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        {/* Bagian Logo */}
        <div className="navbar__logo">
          <img src={logo} alt="Tandoor Logo" className="logo-img" />
        </div>

        {/* Link Navigasi Tengah */}
        <nav className="navbar__links">
          <button
            type="button"
            onClick={() => setPage("home")}
            className="nav-link active"
          >
            Beranda
          </button>

          <button
            type="button"
            onClick={() => setPage("equipment")}
            className="nav-link"
          >
            Peralatan
          </button>

          <button type="button" className="nav-link">
            Penyewaan Saya
          </button>

          <button type="button" className="nav-link nav-link--btn">
            Hubungi Kami
          </button>
        </nav>

        {/* Bagian Auth (Masuk & Daftar) */}
        <div className="navbar__auth">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setPage("login")}
          >
            Masuk
          </button>

          <button
            type="button"
            className="btn btn--primary"
            onClick={() => setPage("register")}
          >
            Daftar
          </button>
        </div>

        {/* Tombol Hamburger untuk Mobile (Penting agar layout tidak berantakan) */}
        <button type="button" className="navbar__hamburger">
          <i className="fa-solid fa-bars"></i>
        </button>

      </div> {/* <-- Ini penutup container yang tadi hilang */}
    </header>
  );
}

export default Navbar;