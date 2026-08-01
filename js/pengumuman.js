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

const form = document.getElementById("formPengumuman");
const list = document.getElementById("listPengumuman");
const cari = document.getElementById("cari");
const btn = document.getElementById("btnSimpan");
const editId = document.getElementById("editId");

let semuaData = [];

// =======================
// LOAD DATA
// =======================

async function loadData() {

    semuaData = [];

    const snapshot = await getDocs(collection(db, "pengumuman"));

    snapshot.forEach((item) => {

        semuaData.push({
            id: item.id,
            ...item.data()
        });

    });

    tampilData(semuaData);

}

loadData();

// =======================
// TAMPILKAN DATA
// =======================

function tampilData(data) {

    list.innerHTML = "";

    data.forEach((item) => {

        list.innerHTML += `

<tr>

<td>${item.judul}</td>

<td>${item.isi}</td>

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

// =======================
// SIMPAN
// =======================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {

        judul: document.getElementById("judul").value,
        isi: document.getElementById("isi").value

    };

    if (editId.value == "") {

        await addDoc(collection(db, "pengumuman"), {

            ...data,

            createdAt: serverTimestamp()

        });

    } else {

        await updateDoc(doc(db, "pengumuman", editId.value), data);

        btn.innerHTML = "Simpan Pengumuman";

        editId.value = "";

    }

    form.reset();

    loadData();

});

// =======================
// EDIT
// =======================

window.editData = (id) => {

    const data = semuaData.find(x => x.id == id);

    document.getElementById("judul").value = data.judul;
    document.getElementById("isi").value = data.isi;

    editId.value = id;

    btn.innerHTML = "Update Pengumuman";

};

// =======================
// HAPUS
// =======================

window.hapusData = async (id) => {

    if (confirm("Yakin ingin menghapus pengumuman ini?")) {

        await deleteDoc(doc(db, "pengumuman", id));

        loadData();

    }

};

// =======================
// CARI
// =======================

cari.addEventListener("keyup", () => {

    const key = cari.value.toLowerCase();

    const hasil = semuaData.filter(item =>

        item.judul.toLowerCase().includes(key) ||
        item.isi.toLowerCase().includes(key)

    );

    tampilData(hasil);

});
