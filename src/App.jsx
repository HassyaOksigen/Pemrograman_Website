// src/App.jsx
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient"; 
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
  const [session, setSession] = useState(null);
  const [editLandData, setEditLandData] = useState(null);

  const [rentFormData, setRentFormData] = useState({
    startDate: "",
    endDate: "",
    deliveryAddress: "",
    note: "",
    isAgreed: false,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Logika Redirect yang sudah diperbaiki
  useEffect(() => {
    if (session) {
      // Jika login, jangan biarkan ke halaman login/register
      if (page === "login" || page === "register") {
        setPage("dashboard");
      }
    } else {
      // Jika logout tapi sedang di dashboard, lempar ke home
      if (page === "dashboard") {
        setPage("home");
      }
    }
  }, [session, page]);

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
      {page === "home" || page === "login" || page === "register" ? (
        <Home setPage={setPage} currentPage={page} session={session} />
      ) : page === "equipment" ? (
        <Equipment setPage={setPage} currentPage={page} session={session} />
      ) : page === "equipment-detail" ||
        page === "rent-form" ||
        page === "terms" ||
        page === "payment" ||
        page === "success" ? (
        <EquipmentDetail
          setPage={setPage}
          currentPage={page}
          session={session}
        />
      ) : page === "dashboard" || page === "landinfo" ? ( // Izinkan landinfo tetap menampilkan background dashboard
        <Dashboard 
          setPage={setPage} 
          currentPage={page} 
          session={session} 
          setEditLandData={setEditLandData} 
        />
      ) : (
        <Home setPage={setPage} currentPage={page} session={session} />
      )}

      {/* --- LAYER MODAL --- */}
      {page === "login" && <Login setPage={setPage} />}
      {page === "register" && <Register setPage={setPage} />}
      
      {/* PERBAIKAN: Hapus "!session", tambahkan props editLandData */}
      {page === "landinfo" && (
        <LandInfo 
          setPage={setPage} 
          session={session} 
          editLandData={editLandData} 
          setEditLandData={setEditLandData}
        />
      )}

      {page === "rent-form" && (
        <RentForm
          setPage={setPage}
          session={session}
          rentData={rentFormData}
          setRentData={setRentFormData}
        />
      )}
      {page === "terms" && <Terms setPage={setPage} />}
      {page === "payment" && (
        <Payment
          setPage={setPage}
          session={session}
          rentData={rentFormData}
          setRentData={setRentFormData}
        />
      )}
      {page === "success" && <Success setPage={setPage} />}
    </div>
  );
}

export default App;