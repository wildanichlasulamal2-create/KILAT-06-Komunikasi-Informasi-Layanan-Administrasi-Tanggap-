import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const form = document.getElementById("formKegiatan");
const list = document.getElementById("listKegiatan");

// ==========================
// SIMPAN KEGIATAN
// ==========================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const tanggal = document.getElementById("tanggal").value;
    const waktu = document.getElementById("waktu").value;
    const lokasi = document.getElementById("lokasi").value;
    const deskripsi = document.getElementById("deskripsi").value;

    await addDoc(collection(db, "kegiatan"), {
        nama,
        tanggal,
        waktu,
        lokasi,
        deskripsi,
        createdAt: serverTimestamp()
    });

    form.reset();

    tampilKegiatan();

});

// ==========================
// TAMPILKAN DATA
// ==========================

async function tampilKegiatan() {

    list.innerHTML = "";

    const snapshot = await getDocs(collection(db, "kegiatan"));

    snapshot.forEach((item) => {

        const data = item.data();

        list.innerHTML += `

        <div class="card">

            <h3>${data.nama}</h3>

            <p><b>Tanggal :</b> ${data.tanggal}</p>

            <p><b>Waktu :</b> ${data.waktu}</p>

            <p><b>Lokasi :</b> ${data.lokasi}</p>

            <p>${data.deskripsi}</p>

            <button onclick="hapus('${item.id}')">
                Hapus
            </button>

        </div>

        `;

    });

}

// ==========================
// HAPUS DATA
// ==========================

window.hapus = async(id)=>{

    await deleteDoc(doc(db,"kegiatan",id));

    tampilKegiatan();

}

// ==========================

tampilKegiatan();