// src/App.jsx
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Equipment from "./pages/Equipment";
import LandInfo from "./pages/LandInfo";
import RentForm from "./pages/RentForm";
import Terms from "./pages/Terms";
import EquipmentDetail from "./pages/EquipmentDetail";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  const isModalOpen = 
    page === "login" || 
    page === "register" || 
    page === "landinfo" || 
    page === "rent-form" || 
    page === "terms" || 
    page === "payment" ||
    page === "success";

  return (
    <div className={`app-wrapper ${isModalOpen ? "modal-open" : ""}`}>
      
      {/* --- HALAMAN UTAMA (Background) --- */}
      
      {(page === "home" || page === "login" || page === "register") ? (
        <Home setPage={setPage} currentPage={page} />
      ) : (page === "equipment") ? (
        <Equipment setPage={setPage} currentPage={page} />
      ) : (page === "equipment-detail" || page === "rent-form" || page === "terms" || page === "payment" || page === "success") ? (
        <EquipmentDetail setPage={setPage} currentPage={page} />
      ) : (page === "dashboard") ? (
        <Dashboard setPage={setPage} currentPage={page} />
      ) : (
        <Home setPage={setPage} currentPage={page} />
      )}

      {/* --- LAYER MODAL --- */}
      {page === "login" && <Login setPage={setPage} />}
      {page === "register" && <Register setPage={setPage} />}
      {page === "landinfo" && <LandInfo setPage={setPage} />}
      {page === "rent-form" && <RentForm setPage={setPage} />}
      {page === "terms" && <Terms setPage={setPage} />}
      {page === "payment" && <Payment setPage={setPage} />}
      {page === "success" && <Success setPage={setPage} />}
      
    </div>
  );
}

export default App;