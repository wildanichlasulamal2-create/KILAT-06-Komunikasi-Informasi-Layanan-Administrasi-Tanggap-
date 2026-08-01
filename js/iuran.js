import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const form = document.getElementById("formIuran");
const list = document.getElementById("listIuran");
const cari = document.getElementById("cari");

const btn = document.getElementById("btnSimpan");
const editId = document.getElementById("editId");

const warga = document.getElementById("warga");
const bulan = document.getElementById("bulan");
const tahun = document.getElementById("tahun");
const nominal = document.getElementById("nominal");
const status = document.getElementById("status");

let semuaData = [];

// ===============================
// LOAD DATA WARGA
// ===============================

async function loadWarga() {

    warga.innerHTML = `
        <option value="">Pilih Warga</option>
    `;

    const snapshot = await getDocs(collection(db, "warga"));

    snapshot.forEach((item) => {

        const data = item.data();

        warga.innerHTML += `
            <option value="${data.nama}">
                ${data.nama}
            </option>
        `;

    });

}

// ===============================
// LOAD DATA IURAN
// ===============================

async function loadData() {

    semuaData = [];

    const snapshot = await getDocs(collection(db, "iuran"));

    snapshot.forEach((item) => {

        semuaData.push({
            id: item.id,
            ...item.data()
        });

    });

    tampilData(semuaData);

}

// ===============================
// TAMPILKAN DATA
// ===============================

function tampilData(data) {

    list.innerHTML = "";

    data.forEach((item) => {

        list.innerHTML += `

<tr>

<td>${item.nama}</td>

<td>${item.bulan}</td>

<td>${item.tahun}</td>

<td>Rp ${Number(item.nominal).toLocaleString("id-ID")}</td>

<td>${item.status}</td>

<td>

<button onclick="editData('${item.id}')">

✏️

</button>

<button onclick="hapusData('${item.id}')">

🗑️

</button>

</td>

</tr>

`;

    });

}

// ===============================
// SIMPAN
// ===============================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {

        nama: warga.value,

        bulan: bulan.value,

        tahun: Number(tahun.value),

        nominal: Number(nominal.value),

        status: status.value

    };

    if (editId.value == "") {

        await addDoc(collection(db, "iuran"), {

            ...data,

            createdAt: serverTimestamp()

        });

    } else {

        await updateDoc(doc(db, "iuran", editId.value), data);

        editId.value = "";

        btn.innerHTML = "Simpan Iuran";

    }

    form.reset();

    loadWarga();

    loadData();

});

// ===============================
// EDIT
// ===============================

window.editData = (id) => {

    const data = semuaData.find(x => x.id == id);

    warga.value = data.nama;
    bulan.value = data.bulan;
    tahun.value = data.tahun;
    nominal.value = data.nominal;
    status.value = data.status;

    editId.value = id;

    btn.innerHTML = "Update Iuran";

};

// ===============================
// HAPUS
// ===============================

window.hapusData = async (id) => {

    if (confirm("Yakin ingin menghapus data iuran?")) {

        await deleteDoc(doc(db, "iuran", id));

        loadData();

    }

};

// ===============================
// CARI
// ===============================

cari.addEventListener("keyup", () => {

    const key = cari.value.toLowerCase();

    const hasil = semuaData.filter(item =>

        item.nama.toLowerCase().includes(key)

    );

    tampilData(hasil);

});

// ===============================

loadWarga();

loadData();