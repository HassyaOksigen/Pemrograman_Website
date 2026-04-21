// src/components/Navbar.jsx
import logo from "../assets/logo.png";

function Navbar({ setPage, currentPage }) {
  return (
    <nav className="navbar sticky-navbar">
      <div className="container navbar__inner">
        <div className="navbar__logo" onClick={() => setPage("home")}>
          <img src={logo} alt="Tandoor" className="logo-img" />
        </div>

        <ul className="navbar__menu">
          <li 
            className={currentPage === "home" ? "active-link" : "nav-item"} 
            onClick={() => setPage("home")}
          >
            Beranda
          </li>
          <li 
            className={(currentPage === "equipment" || currentPage === "equipment-detail") ? "active-link" : "nav-item"} 
            onClick={() => setPage("equipment")}
          >
            Peralatan
          </li>
          <li 
            className={currentPage === "dashboard" ? "active-link" : "nav-item"} 
            onClick={() => setPage("dashboard")}
          >
            Penyewaan Saya
          </li>
          <li className="nav-item">Hubungi Kami</li>
        </ul>

        <div className="navbar__auth">
          <span className="btn-login" onClick={() => setPage("login")}>Masuk</span>
          <span className="btn-daftar" onClick={() => setPage("register")}>Daftar</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;