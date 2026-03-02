// Elements
const backdrop       = document.getElementById('modalBackdrop');
const modalLogin     = document.getElementById('modalLogin');
const modalRegister  = document.getElementById('modalRegister');
const modalLahan     = document.getElementById('modalLahan');

// Helpers
function openModal(modal) {
  closeAll();
  modal.classList.add('modal--open');
  backdrop.classList.add('modal-backdrop--visible');
  document.body.classList.add('modal-open');
}

function closeAll() {
  [modalLogin, modalRegister, modalLahan].forEach(m => m.classList.remove('modal--open'));
  backdrop.classList.remove('modal-backdrop--visible');
  document.body.classList.remove('modal-open');
}

// Triggers
document.getElementById('btnOpenLogin').addEventListener('click',    () => openModal(modalLogin));
document.getElementById('btnOpenRegister').addEventListener('click', () => openModal(modalRegister));
document.getElementById('btnCloseLogin').addEventListener('click',   closeAll);
document.getElementById('btnCloseRegister').addEventListener('click', closeAll);
document.getElementById('btnOpenLahan').addEventListener('click',    () => openModal(modalLahan));
document.getElementById('btnCloseLahan').addEventListener('click',   closeAll);
document.getElementById('btnLahanLewati').addEventListener('click',  closeAll);
backdrop.addEventListener('click', closeAll);

// Switch between modals
document.getElementById('btnSwitchToRegister').addEventListener('click', () => openModal(modalRegister));
document.getElementById('btnSwitchToLogin').addEventListener('click',    () => openModal(modalLogin));

// Close on Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });

// Password toggle
document.querySelectorAll('.input-eye').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    const icon  = btn.querySelector('i');
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
  });
});

// Form validation: Informasi Lahan
document.getElementById('formLahan').addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;

  clearErrors(this);

  const nama     = document.getElementById('lahanNama');
  const tipe     = document.getElementById('lahanTipe');
  const luas     = document.getElementById('lahanLuas');
  const alamat   = document.getElementById('lahanAlamat');
  const kota     = document.getElementById('lahanKota');
  const provinsi = document.getElementById('lahanProvinsi');
  const kodePos  = document.getElementById('lahanKodePos');
  const negara   = document.getElementById('lahanNegara');

  if (!nama.value.trim())     { showError('lahanNamaErr',     'Nama lahan wajib diisi.');     valid = false; }
  if (!tipe.value.trim())     { showError('lahanTipeErr',     'Tipe lahan wajib diisi.');     valid = false; }
  if (!luas.value.trim())     { showError('lahanLuasErr',     'Luas lahan wajib diisi.');     valid = false; }
  if (!alamat.value.trim())   { showError('lahanAlamatErr',   'Alamat wajib diisi.');         valid = false; }
  if (!kota.value.trim())     { showError('lahanKotaErr',     'Kota wajib diisi.');           valid = false; }
  if (!provinsi.value.trim()) { showError('lahanProvinsiErr', 'Provinsi wajib diisi.');       valid = false; }
  if (!kodePos.value.trim())  { showError('lahanKodePosErr',  'Kode pos wajib diisi.');       valid = false; }
  if (!negara.value.trim())   { showError('lahanNegaraErr',   'Negara wajib diisi.');         valid = false; }

  if (valid) {
    alert('Informasi lahan berhasil disimpan! (demo)');
    closeAll();
    this.reset();
  }
});

// Form validation: Login
document.getElementById('formLogin').addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;

  const email    = document.getElementById('loginEmail');
  const password = document.getElementById('loginPassword');

  clearErrors(this);

  if (!email.value.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(email.value)) {
    showError('loginEmailErr', 'Masukkan email yang valid.');
    valid = false;
  }
  if (password.value.length < 6) {
    showError('loginPasswordErr', 'Password minimal 6 karakter.');
    valid = false;
  }

  if (valid) {
    // TODO: integrate with backend
    alert('Login berhasil! (demo)');
    closeAll();
    this.reset();
  }
});

// Form validation: Register
document.getElementById('formRegister').addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;

  clearErrors(this);

  const firstName = document.getElementById('regFirstName');
  const lastName  = document.getElementById('regLastName');
  const email     = document.getElementById('regEmail');
  const phone     = document.getElementById('regPhone');
  const password  = document.getElementById('regPassword');
  const confirm   = document.getElementById('regConfirm');

  if (!firstName.value.trim()) { showError('regFirstNameErr', 'Nama depan wajib diisi.'); valid = false; }
  if (!lastName.value.trim())  { showError('regLastNameErr',  'Nama belakang wajib diisi.'); valid = false; }
  if (!email.value.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(email.value)) {
    showError('regEmailErr', 'Masukkan email yang valid.'); valid = false;
  }
  if (!/^[0-9]{8,15}$/.test(phone.value.trim())) {
    showError('regPhoneErr', 'Masukkan nomor telepon yang valid.'); valid = false;
  }
  if (password.value.length < 6) { showError('regPasswordErr', 'Password minimal 6 karakter.'); valid = false; }
  if (confirm.value !== password.value) { showError('regConfirmErr', 'Konfirmasi password tidak cocok.'); valid = false; }

  if (valid) {
    // TODO: integrate with backend
    alert('Pendaftaran berhasil! (demo)');
    closeAll();
    this.reset();
  }
});

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearErrors(form) {
  form.querySelectorAll('.form-error').forEach(el => el.textContent = '');
}
