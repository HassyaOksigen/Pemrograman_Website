import { useState } from "react";
import Home from "./pages/Home";
import Equipment from "./pages/Equipment";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandInfo from "./pages/LandInfo";
import "./styles/Global.css";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="app-wrapper" style={{ position: "relative" }}>
      {/* 1. Halaman Utama (Selalu Render atau Render Berdasarkan State) */}
      {page === "home" || page === "login" || page === "register" || page === "land-info" ? (
        <Home setPage={setPage} />
      ) : null}
      
      {page === "equipment" && <Equipment setPage={setPage} />}

      {/* 2. Layer Modal (Muncul di ATAS Home) */}
      {page === "login" && <Login setPage={setPage} />}
      {page === "register" && <Register setPage={setPage} />}
      {page === "land-info" && <LandInfo setPage={setPage} />}
    </div>
  );
}

export default App;