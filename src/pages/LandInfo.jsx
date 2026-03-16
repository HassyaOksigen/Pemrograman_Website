import Navbar from "../components/Navbar";
import "../styles/Auth.css";

function LandInfo({ setPage }) {
  return (
    <div className="auth-container">
      <Navbar setPage={setPage} />
      <div className="auth-overlay">
        <div className="auth-card auth-card--large scrollable-card">
          <button className="close-btn" onClick={() => setPage("home")}>✕</button>
          
          <h2>Informasi Lahan</h2>
          <p>Bantu kami memberikan layanan yang lebih sesuai dengan kebutuhan Anda.</p>

          <form>
            <h3 className="section-title">Informasi Dasar</h3>
            <div className="form-group">
              <label>Nama Lahan *</label>
              <input type="text" placeholder="Masukkan nama lahan Anda" />
            </div>
            <div className="form-row">
              <div>
                <label>Tipe Lahan *</label>
                <input type="text" placeholder="Contoh: Sawah" />
              </div>
              <div>
                <label>Luas Lahan *</label>
                <input type="text" placeholder="m²" />
              </div>
            </div>

            <h3 className="section-title">Lokasi</h3>
            <div className="form-group">
              <label>Alamat *</label>
              <input type="text" placeholder="Masukkan alamat lengkap" />
            </div>
            <div className="form-row">
              <input type="text" placeholder="Kota" />
              <input type="text" placeholder="Provinsi" />
            </div>
            <div className="form-row">
              <input type="text" placeholder="Kode Pos" />
              <input type="text" placeholder="Negara" />
            </div>

            <h3 className="section-title">Operasional Lahan</h3>
            <div className="form-group">
              <label>Komoditas Utama</label>
              <input type="text" placeholder="Contoh: Padi, Jagung" />
            </div>
            <div className="form-group">
              <label>Deskripsi Tambahan</label>
              <textarea placeholder="Ceritakan sedikit tentang lahan Anda"></textarea>
            </div>

            <div className="info-box">
              <p>Informasi ini membantu pemilik alat memahami kebutuhan Anda sehingga dapat memberikan layanan yang lebih baik.</p>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn--outline" onClick={() => setPage("home")}>Lewati Sekarang</button>
              <button type="submit" className="btn btn--primary" onClick={() => setPage("home")}>Simpan Informasi Lahan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandInfo;