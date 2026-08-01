import { db } from "./firebase.js";

import {
collection,
getDocs,
query,
orderBy,
limit
}
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const totalWarga=document.getElementById("totalWarga");
const totalPengumuman=document.getElementById("totalPengumuman");
const totalKegiatan=document.getElementById("totalKegiatan");

// =====================
// HITUNG DATA
// =====================

async function hitung(){

const warga=await getDocs(collection(db,"warga"));
const pengumuman=await getDocs(collection(db,"pengumuman"));
const kegiatan=await getDocs(collection(db,"kegiatan"));

totalWarga.innerHTML=warga.size;
totalPengumuman.innerHTML=pengumuman.size;
totalKegiatan.innerHTML=kegiatan.size;

}

hitung();

// =====================
// PENGUMUMAN
// =====================

const listPengumuman=document.getElementById("pengumumanTerbaru");

async function tampilPengumuman(){

listPengumuman.innerHTML="";

const q=query(
collection(db,"pengumuman"),
orderBy("createdAt","desc"),
limit(5)
);

const snapshot=await getDocs(q);

snapshot.forEach((doc)=>{

const data=doc.data();

listPengumuman.innerHTML+=`

<div class="card">

<h3>${data.judul}</h3>

<p>${data.isi}</p>

</div>

`;

});

}

tampilPengumuman();

// =====================
// KEGIATAN
// =====================

const listKegiatan=document.getElementById("kegiatanTerbaru");

async function tampilKegiatan(){

listKegiatan.innerHTML="";

const q=query(
collection(db,"kegiatan"),
orderBy("createdAt","desc"),
limit(5)
);

const snapshot=await getDocs(q);

snapshot.forEach((doc)=>{

const data=doc.data();

listKegiatan.innerHTML+=`

<div class="card">

<h3>${data.nama}</h3>

<p>${data.tanggal}</p>

<p>${data.lokasi}</p>

</div>

`;

});

}

tampilKegiatan();

