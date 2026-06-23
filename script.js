const arsipData = [
  {
    noProyek: "2500001479226",
    namaProyek: "Pembangunan Gudang Pelet",
    kontraktor: "Dua Sinar Duta Jaya",
    kontrak: "14 April 2025 s/d 31 Agustus 2025",
    tanggal: "2025-04-15",
    tanggalTampil: "15 April 2025",
    boks: "Filling Cabinet 5 Laci 1",
    file: "./dokumen/79226_DuaSinarDutaJaya.pdf",
    aksesUser: "Admin",
    aksesDate: "1 Jan 2026",
    aksesTime: "10:30 WIB",
    status: "Terkirim",
    keterangan: "Dokumen proyek gudang pelet."
  },
  {
    noProyek: "2500001470014",
    namaProyek: "Instalasi Pipa Gas PGN",
    kontraktor: "Trijayamahe",
    kontrak: "19 Februari 2025 s/d 31 Mei 2025",
    tanggal: "2025-02-20",
    tanggalTampil: "20 Februari 2025",
    boks: "Filling Cabinet 5 Laci 1",
    file: "./dokumen/70014_Trijayamahe.pdf",
    aksesUser: "Admin",
    aksesDate: "20 Feb 2025",
    aksesTime: "09:15 WIB",
    status: "Terkirim",
    keterangan: "Dokumen instalasi pipa gas."
  },
  {
    noProyek: "2500001466655",
    namaProyek: "Pekerjaan Maintenance Pabrik GDS",
    kontraktor: "Barito Anugrah Sejati",
    kontrak: "1 Januari 2025 s/d 30 Juni 2025",
    tanggal: "2025-01-02",
    tanggalTampil: "2 Januari 2025",
    boks: "Filling Cabinet 5 Laci 1",
    file: "./dokumen/66655_BaritoAnugrahSejati.pdf",
    aksesUser: "Admin",
    aksesDate: "2 Jan 2025",
    aksesTime: "13:40 WIB",
    status: "Terkirim",
    keterangan: "Berkas maintenance pabrik."
  },
  {
    noProyek:"2500001654175",
    namaProyek:"Rehabilitasi Ringan Bangunan Tidak Bertingkat 30 Paket E294",
    kontraktor:"ALFASINDO PRATAMA",
    kontrak:"26 November 2025 s/d 26 Desember 2026",
    tanggal:"2025-11-26",
    tanggalTampil:"26 November 2025",
    boks:"Filling Cabinet 5 Laci 1",
    file:"./dokumen/654175_ALFASINDO.pdf",
    aksesUser:"Admin",
    aksesDate:"26 November 2025",
    aksesTime:"08:00 WIB",
    status:"Terkirim"
},
{
    noProyek:"2500001654148",
    namaProyek:"Rehabilitasi Ringan Bangunan Tidak Bertingkat 30 Paket E416",
    kontraktor:"ALFASINDO PRATAMA",
    kontrak:"26 November 2025 s/d 26 Desember 2026",
    tanggal:"2025-11-26",
    tanggalTampil:"26 November 2025",
    boks:"Filling Cabinet 5 Laci 1",
    file:"./dokumen/654148_ALFASINDO.pdf",
    aksesUser:"Admin",
    aksesDate:"26 November 2025",
    aksesTime:"10:00 WIB",
    status:"Terkirim"
}
];

const kontraktorList = [
  "Dua Sinar Duta Jaya",
  "Trijayamahe",
  "Barito Anugrah Sejati",
  "Gunung Api Mulia",
  "Putra Teknik Sejahtera"
];

const usersData = [
{
nama:"Carina Ardhiany",
email:"carina.ardhiany@bpjsketenagakerjaan.go.id",
role:"Admin",
terakhirLogin:"29 Juni 2026, 08:00",
anda:true
},
{
nama:"Hailey Bieber",
email:"hailey@bpjsketenagakerjaan.go.id",
role:"User",
terakhirLogin:"29 Juni 2026, 10:00",
anda:false
},
{
nama:"Daniel Caesar",
email:"daniel@bpjsketenagakerjaan.go.id",
role:"User",
terakhirLogin:"29 Juni 2026, 12:00",
anda:false
},
{
nama:"ALFASINDO 1",
email:"alfasindo1@bpjsketenagakerjaan.go.id",
role:"User",
terakhirLogin:"29 Juni 2026, 14:00",
anda:false
},
{
nama:"ALFASINDO 2",
email:"alfasindo2@bpjsketenagakerjaan.go.id",
role:"User",
terakhirLogin:"29 Juni 2026, 16:00",
anda:false
}
];

const profileData = {
  nama: "Carina Ardhiany",
  email: "carina.ardhiany@bpjsketenagakerjaan.go.id",
  role: "Admin",
  username: "carinaardhiany",
};

const loginUser =
JSON.parse(localStorage.getItem("loginUser")) || {

nama:"Admin",

role:"Admin"

};

let deleteArsipIndex = null;
let currentPreviewIndex = null;

const pages = document.querySelectorAll(".page");
const navItems = document.querySelectorAll(".nav-item");
const breadcrumb = document.getElementById("breadcrumb");

const pageTitles = {
  dashboardPage: "Home >> Dashboard",
  kelolaPage: "Home >> Kelola Arsip",
  searchPage:"Home >> Pencarian Dokumen",
  uploadPage: "Home >> Upload Dokumen",
  userPage: "Home >> Kelola User"
};

document.addEventListener("DOMContentLoaded", () => {
  bindNavigation();
  bindAdminDropdown();
  bindModals();
  bindForms();
  bindKontraktor();
  renderDashboard();
  renderArsipTable();
  renderUserTable();
  updateCounters();
});

function bindNavigation() {
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetPage = item.dataset.page;
      showPage(targetPage);

      navItems.forEach(nav => nav.classList.remove("active"));
      item.classList.add("active");
    });
  });

  const menuToggle = document.getElementById("menuToggle");
  menuToggle.addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("mobile-open");
  });
}

function showPage(pageId) {
  pages.forEach(page => page.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
  breadcrumb.textContent = pageTitles[pageId] || "Home";

  if (window.innerWidth <= 1024) {
    document.getElementById("sidebar").classList.remove("mobile-open");
  }
}

function bindAdminDropdown() {
  const trigger = document.getElementById("adminTrigger");
  const dropdown = document.getElementById("adminDropdown");

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && !trigger.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });

  document.getElementById("btnProfile").addEventListener("click", () => {
    document.getElementById("profileName").textContent = profileData.nama;
    document.getElementById("profileEmail").textContent = profileData.email;
    document.getElementById("profileRole").textContent = profileData.role;
    document.getElementById("profileUsername").textContent = profileData.username;
    openModal("profileModal");
    dropdown.classList.remove("show");
  });

  document.getElementById("btnLogout").addEventListener("click", () => {

    const konfirmasi = confirm("Apakah Anda yakin ingin logout ?");

    if(!konfirmasi) return;

    /* hapus seluruh session */

    localStorage.clear();

    sessionStorage.clear();

    /* hapus login */

    localStorage.removeItem("loginUser");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userLogin");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("role");

    sessionStorage.removeItem("loginUser");
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("userLogin");
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("role");

    alert("Logout berhasil.");

    window.location.replace(
        "https://wahyuaji1303.github.io/SIADJAK-Arsip-Digital-Jasa-Konstruksi-/"
    );

});
}

function renderDashboard(){

    document.getElementById("totalArsipCount").textContent =
    arsipData.length;

    document.getElementById("latestCount").textContent =
    "(" + arsipData.length + ")";

    const latestList =
    document.getElementById("latestList");

    latestList.innerHTML = "";

    arsipData.forEach(item => {

        latestList.insertAdjacentHTML("beforeend",`

            <div class="latest-item">

                <div class="latest-left">

                    <div class="file-emoji">📁</div>

                    <div>
                        <strong>${item.noProyek}</strong>
                        <span>${item.kontraktor}</span>
                    </div>

                </div>

                <div class="latest-date">
                    ${formatTanggalSimple(item.tanggal)}
                </div>

            </div>

        `);

    });

}

function renderArsipTable(keyword = "", kontraktor = "") {
  const tbody = document.getElementById("arsipTableBody");
  tbody.innerHTML = "";

  const filtered = arsipData.filter(item => {
    const gabung = `
      ${item.noProyek}
      ${item.namaProyek}
      ${item.kontraktor}
      ${item.kontrak}
      ${item.boks}
      ${item.status}
      ${item.tanggalTampil}
    `.toLowerCase();

    const cocokKeyword = gabung.includes(keyword.toLowerCase());
    const cocokKontraktor = kontraktor === "" || item.kontraktor === kontraktor;

    return cocokKeyword && cocokKontraktor;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center;">Data arsip tidak ditemukan.</td>
      </tr>
    `;
    return;
  }

  filtered.forEach((item) => {
    const originalIndex = arsipData.findIndex(data => data.noProyek === item.noProyek);

    tbody.insertAdjacentHTML("beforeend", `
      <tr>
        <td><strong>${item.noProyek}</strong></td>
        <td>${item.namaProyek}</td>
        <td>${item.kontraktor}</td>
        <td>${item.kontrak}</td>
        <td>${item.tanggalTampil}</td>
        <td>${item.boks}</td>
        <td>
          <div class="action-buttons">
            <button class="mini-btn mini-view" onclick="openPreviewModal(${originalIndex})">Lihat Dokumen</button>
            <button class="mini-btn mini-edit" onclick="openEditArsipModal(${originalIndex})">Edit</button>
            <button class="mini-btn mini-delete" onclick="openDeleteArsipModal(${originalIndex})">Delete</button>
          </div>
        </td>
      </tr>
    `);
  });
}
function cariDokumen(){

const no=document.getElementById("cariNoProyek").value.toLowerCase();

const nama=document.getElementById("cariNamaProyek").value.toLowerCase();

const kontraktor=document.getElementById("cariKontraktor").value.toLowerCase();

const tanggal=document.getElementById("cariTanggal").value;

const tbody=document.getElementById("hasilPencarian");

tbody.innerHTML="";

const hasil=arsipData.filter(item=>{

return(

item.noProyek.toLowerCase().includes(no)

&&

item.namaProyek.toLowerCase().includes(nama)

&&

item.kontraktor.toLowerCase().includes(kontraktor)

&&

(tanggal=="" || item.tanggal==tanggal)

);

});

if(hasil.length==0){

tbody.innerHTML=`

<tr>

<td colspan="7" style="text-align:center">

Data Tidak Ditemukan

</td>

</tr>

`;

return;

}

hasil.forEach(item=>{

const index=arsipData.findIndex(x=>x.noProyek==item.noProyek);

tbody.innerHTML+=`

<tr>

<td>${item.noProyek}</td>

<td>${item.namaProyek}</td>

<td>${item.kontraktor}</td>

<td>${item.kontrak}</td>

<td>${item.tanggalTampil}</td>

<td>${item.boks}</td>

<td>

<div class="action-buttons">

<button class="mini-btn mini-view"
onclick="openPreviewModal(${index})">

Lihat

</button>

<button class="mini-btn mini-edit"
onclick="openEditArsipModal(${index})">

Edit

</button>

<button class="mini-btn mini-delete"
onclick="openDeleteArsipModal(${index})">

Hapus

</button>

</div>

</td>

</tr>

`;

});

}
function filterKelolaAdmin() {
  const keyword = document.getElementById("searchArsip").value.trim();
  const kontraktor = document.getElementById("filterKontraktor").value;
  renderArsipTable(keyword, kontraktor);
}

document.addEventListener("input", (e) => {
  if (e.target && e.target.id === "searchArsip") {
    filterKelolaAdmin();
  }

  if (e.target && e.target.id === "searchUser") {
    renderUserTable(e.target.value);
  }
});

document.addEventListener("change", (e) => {
  if (e.target && e.target.id === "filterKontraktor") {
    filterKelolaAdmin();
  }
});

function bindKontraktor() {
  const btnOpen = document.getElementById("btnOpenKontraktor");
  const btnSave = document.getElementById("btnSimpanKontraktor");

  btnOpen.addEventListener("click", () => {
    document.getElementById("namaKontraktorBaru").value = "";
    openModal("kontraktorModal");

    setTimeout(() => {
      document.getElementById("namaKontraktorBaru").focus();
    }, 100);
  });

  btnSave.addEventListener("click", () => {
    const input = document.getElementById("namaKontraktorBaru");
    const nama = input.value.trim();

    if (!nama) {
      alert("Nama kontraktor wajib diisi.");
      return;
    }

    const select = document.getElementById("filterKontraktor");
    const sudahAda = Array.from(select.options).some(opt => opt.value.toLowerCase() === nama.toLowerCase());

    if (sudahAda) {
      alert("Kontraktor sudah ada.");
      return;
    }

    const option = document.createElement("option");
    option.value = nama;
    option.textContent = nama;
    select.appendChild(option);
    select.value = nama;

    closeModal("kontraktorModal");
    filterKelolaAdmin();
    alert("Kontraktor berhasil ditambahkan.");
  });
}

function openPreviewModal(index){

    currentPreviewIndex = index;

    const item = arsipData[index];

    document.getElementById("previewFileName").textContent =
        item.file.split("/").pop();

    openModal("previewModal");
}

 
function openEditArsipModal(index) {
  const item = arsipData[index];

  document.getElementById("editArsipIndex").value = index;
  document.getElementById("editNoProyek").value = item.noProyek;
  document.getElementById("editNamaProyek").value = item.namaProyek;
  document.getElementById("editKontraktor").value = item.kontraktor;
  document.getElementById("editKontrak").value = item.kontrak;
  document.getElementById("editTanggal").value = item.tanggal;
  document.getElementById("editBoks").value = item.boks;
  document.getElementById("editKeterangan").value = item.keterangan;

  openModal("editArsipModal");
}

function openDeleteArsipModal(index) {
  deleteArsipIndex = index;
  document.getElementById("deleteFileName").textContent = arsipData[index].file;
  openModal("deleteArsipModal");
}

function renderUserTable(keyword = "") {
  const tbody = document.getElementById("userTableBody");
  tbody.innerHTML = "";

  const filtered = usersData.filter(user => {
    const gabung = `${user.nama} ${user.email} ${user.role} ${user.status}`.toLowerCase();
    return gabung.includes(keyword.toLowerCase());
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;">Data user tidak ditemukan.</td>
      </tr>
    `;
    return;
  }

  

  filtered.forEach((user) => {
    const originalIndex = usersData.findIndex(item => item.email === user.email);
    const roleClass = user.role === "Admin" ? "badge-admin" : "badge-user";
    const labelAnda = user.anda ? `<span class="badge badge-admin" style="margin-left:8px;">Anda</span>` : "";

    tbody.insertAdjacentHTML("beforeend", `
      <tr>
        <td><strong>👤 ${user.nama}</strong> ${labelAnda}</td>
        <td>${user.email}</td>
        <td><span class="badge ${roleClass}">${user.role}</span></td>
        
        <td>${user.terakhirLogin}</td>
        <td>
          <div class="action-buttons">
            <button class="mini-btn mini-edit" onclick="openEditUserModal(${originalIndex})">Edit</button>
            <button class="mini-btn mini-delete" onclick="deleteUser(${originalIndex})">Hapus</button>
          </div>
        </td>
      </tr>
    `);
  });
}

function openEditUserModal(index) {
  const user = usersData[index];

  document.getElementById("editUserIndex").value = index;
  document.getElementById("editUserName").value = user.nama;
  document.getElementById("editUserEmail").value = user.email;
  document.getElementById("editUserPassword").value = "";
  document.getElementById("editUserPasswordConfirm").value = "";
  document.getElementById("editUserRole").value = user.role;

  openModal("editUserModal");
}

function deleteUser(index) {
  const user = usersData[index];
  const isConfirm = confirm(`Yakin ingin menghapus user ${user.nama}?`);

  if (isConfirm) {
    usersData.splice(index, 1);
    renderUserTable(document.getElementById("searchUser").value);
    updateCounters();
    alert("User berhasil dihapus.");
  }
}

function bindForms() {
  document.getElementById("uploadForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const noProyek = document.getElementById("uploadNoProyek").value.trim();
    const namaProyek = document.getElementById("uploadNamaProyek").value.trim();
    const kontraktor = document.getElementById("uploadKontraktor").value.trim();
    const mulai= document.getElementById("uploadKontrakMulai").value; const selesai= document.getElementById("uploadKontrakSelesai").value; const kontrak= formatTanggalSimple(mulai)+ " s/d "+ formatTanggalSimple(selesai);
    const tanggal = document.getElementById("uploadTanggal").value;
    const boks = document.getElementById("uploadBoks").value.trim();
    const keterangan = document.getElementById("uploadKeterangan").value.trim();
    const fileInput = document.getElementById("uploadFile");

    if (!noProyek || !namaProyek || !kontraktor || !kontrak || !tanggal || !boks) {
      alert("Mohon lengkapi data upload dokumen.");
      return;
    }

    const fileName = fileInput.files[0]
      ? fileInput.files[0].name
      : `${noProyek}_${kontraktor.replace(/\s+/g, "")}.pdf`;

    arsipData.unshift({
      noProyek,
      namaProyek,
      kontraktor,
      kontrak,
      tanggal,
      tanggalTampil: formatTanggalSimple(tanggal),
      boks,
      keterangan,
      file: fileName,
      aksesUser: "Admin",
      aksesDate: formatTanggalSimple(tanggal),
      aksesTime: "09:00 WIB",
      status: "Terkirim"
    });

    const select = document.getElementById("filterKontraktor");
    const sudahAda = Array.from(select.options).some(opt => opt.value.toLowerCase() === kontraktor.toLowerCase());

    if (!sudahAda) {
      const option = document.createElement("option");
      option.value = kontraktor;
      option.textContent = kontraktor;
      select.appendChild(option);
    }

    this.reset();
    renderDashboard();
    renderArsipTable();
    updateCounters();
    alert("Berkas berhasil disimpan.");
    showPage("uploadPage");
    setActiveNavByPage("uploadPage");
  });

  document.getElementById("editArsipForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const index = parseInt(document.getElementById("editArsipIndex").value, 10);
    if (isNaN(index)) return;

    arsipData[index].noProyek = document.getElementById("editNoProyek").value.trim();
    arsipData[index].namaProyek = document.getElementById("editNamaProyek").value.trim();
    arsipData[index].kontraktor = document.getElementById("editKontraktor").value.trim();
    const mulai= document.getElementById("editKontrakMulai").value;
    const selesai= document.getElementById("editKontrakSelesai").value;
    arsipData[index].kontrak= formatTanggalSimple(mulai)+" s/d "+ formatTanggalSimple(selesai);

    arsipData[index].tanggal = document.getElementById("editTanggal").value;
    arsipData[index].tanggalTampil = formatTanggalSimple(arsipData[index].tanggal);
    arsipData[index].boks = document.getElementById("editBoks").value.trim();
    arsipData[index].keterangan = document.getElementById("editKeterangan").value.trim();

    renderDashboard();
    filterKelolaAdmin();
    closeModal("editArsipModal");
    alert("Perubahan berkas berhasil disimpan.");
  });

  document.getElementById("confirmDeleteArsip").addEventListener("click", () => {
    if (deleteArsipIndex !== null) {
      arsipData.splice(deleteArsipIndex, 1);
      deleteArsipIndex = null;
      renderDashboard();
      filterKelolaAdmin();
      updateCounters();
      closeModal("deleteArsipModal");
      alert("Dokumen berhasil dihapus.");
    }
  });

  document.getElementById("btnOpenAddUser").addEventListener("click", () => {
    document.getElementById("addUserForm").reset();
    openModal("addUserModal");
  });

  document.getElementById("addUserForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("addUserName").value.trim();
    const email = document.getElementById("addUserEmail").value.trim();
    const password = document.getElementById("addUserPassword").value.trim();
    const confirmPassword = document.getElementById("addUserPasswordConfirm").value.trim();
    const role = document.getElementById("addUserRole").value;

    if (!nama || !email || !password || !confirmPassword || !role) {
      alert("Mohon lengkapi data user.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Konfirmasi password tidak sama.");
      return;
    }

    usersData.push({
      nama,
      email,
      role,
      status: "Aktif",
      terakhirLogin: "Belum login",
      anda: false
    });

    renderUserTable(document.getElementById("searchUser").value);
    updateCounters();
    closeModal("addUserModal");
    alert("User berhasil ditambahkan.");
  });

  document.getElementById("editUserForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const index = parseInt(document.getElementById("editUserIndex").value, 10);
    if (isNaN(index)) return;

    const nama = document.getElementById("editUserName").value.trim();
    const email = document.getElementById("editUserEmail").value.trim();
    const password = document.getElementById("editUserPassword").value.trim();
    const confirmPassword = document.getElementById("editUserPasswordConfirm").value.trim();
    const role = document.getElementById("editUserRole").value;

    if (!nama || !email || !role) {
      alert("Data user belum lengkap.");
      return;
    }

    if ((password || confirmPassword) && password !== confirmPassword) {
      alert("Konfirmasi password tidak sama.");
      return;
    }

    usersData[index].nama = nama;
    usersData[index].email = email;
    usersData[index].role = role;

    renderUserTable(document.getElementById("searchUser").value);
    updateCounters();
    closeModal("editUserModal");
    alert("Data user berhasil diperbarui.");
  });
}

document.getElementById("btnDownloadPDF").onclick = function () {

    if (currentPreviewIndex === null) {
        alert("Dokumen tidak ditemukan.");
        return;
    }

    const item = arsipData[currentPreviewIndex];

    const a = document.createElement("a");

    a.href = item.file;

    a.download = "";

    a.target = "_blank";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

};

function bindModals() {
  document.querySelectorAll("[data-close]").forEach(btn => {
    btn.addEventListener("click", () => {
      closeModal(btn.dataset.close);
    });
  });

  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
      }
    });
  });
}

function openModal(id) {
  document.getElementById(id).classList.add("show");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("show");
}

function updateCounters() {
  document.getElementById("totalArsipCount").textContent = arsipData.length;
  document.getElementById("totalUserCount").textContent = usersData.length;
  document.getElementById("activeUserCount").textContent =
    usersData.filter(user => user.status === "Aktif").length;
}

function setActiveNavByPage(pageId) {
  navItems.forEach(nav => {
    nav.classList.toggle("active", nav.dataset.page === pageId);
  });
}

function formatTanggalSimple(dateValue) {
  if (!dateValue) return "-";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  localStorage.clear();
sessionStorage.clear();

window.location.href =
"https://wahyuaji1303.github.io/SIADJAK-Arsip-Digital-Jasa-Konstruksi-/";

function convertTanggal(text){

const bulan={

"Januari":"01",

"Februari":"02",

"Maret":"03",

"April":"04",

"Mei":"05",

"Juni":"06",

"Juli":"07",

"Agustus":"08",

"September":"09",

"Oktober":"10",

"November":"11",

"Desember":"12"

};

const p=text.trim().split(" ");

return p[2]+"-"+bulan[p[1]]+"-"+p[0].padStart(2,"0");

}

}
