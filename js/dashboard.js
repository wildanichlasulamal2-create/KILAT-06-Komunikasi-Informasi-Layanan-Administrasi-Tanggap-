import { db } from "./firebase.js";

import {
collection,
getDocs,
query,
orderBy,
limit
}
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// =======================
// TOTAL PENGUMUMAN
// =======================

const totalPengumuman=document.getElementById("totalPengumuman");

const totalKegiatan=document.getElementById("totalKegiatan");

async function hitungData(){

const p=await getDocs(collection(db,"pengumuman"));

const k=await getDocs(collection(db,"kegiatan"));

totalPengumuman.innerHTML=p.size;

totalKegiatan.innerHTML=k.size;

}

hitungData();

// =======================
// PENGUMUMAN TERBARU
// =======================

const pengumuman=document.getElementById("pengumumanTerbaru");

async function tampilPengumuman(){

pengumuman.innerHTML="";

const q=query(
collection(db,"pengumuman"),
orderBy("createdAt","desc"),
limit(5)
);

const snapshot=await getDocs(q);

snapshot.forEach((doc)=>{

const data=doc.data();

pengumuman.innerHTML+=`

<div class="card">

<h3>${data.judul}</h3>

<p>${data.isi}</p>

</div>

`;

});

}

tampilPengumuman();

// =======================
// KEGIATAN TERBARU
// =======================

const kegiatan=document.getElementById("kegiatanTerbaru");

async function tampilKegiatan(){

kegiatan.innerHTML="";

const q=query(
collection(db,"kegiatan"),
orderBy("createdAt","desc"),
limit(5)
);

const snapshot=await getDocs(q);

snapshot.forEach((doc)=>{

const data=doc.data();

kegiatan.innerHTML+=`

<div class="card">

<h3>${data.nama}</h3>

<p>${data.tanggal}</p>

<p>${data.lokasi}</p>

</div>

`;

});

}

tampilKegiatan();