import { db } from "./firebase.js";

import {
collection,
getDocs,
query,
orderBy,
limit
}
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


// =====================
// ELEMENT DASHBOARD
// =====================

const totalWarga = document.getElementById("totalWarga");
const totalPengumuman = document.getElementById("totalPengumuman");
const totalKegiatan = document.getElementById("totalKegiatan");

const totalIuran = document.getElementById("totalIuran");
const sudahLunas = document.getElementById("sudahLunas");
const belumLunas = document.getElementById("belumLunas");


// =====================
// HITUNG DATA
// =====================

async function hitung(){

try{

const warga = await getDocs(collection(db,"warga"));
const pengumuman = await getDocs(collection(db,"pengumuman"));
const kegiatan = await getDocs(collection(db,"kegiatan"));
const iuran = await getDocs(collection(db,"iuran"));


// DATA JUMLAH

totalWarga.innerHTML = warga.size;
totalPengumuman.innerHTML = pengumuman.size;
totalKegiatan.innerHTML = kegiatan.size;


// =====================
// HITUNG IURAN
// =====================

let jumlahUang = 0;
let lunas = 0;
let belum = 0;


iuran.forEach((doc)=>{

const data = doc.data();


// total uang
jumlahUang += Number(data.jumlah || 0);


// status pembayaran
if(data.status === "Lunas"){
    lunas++;
}else{
    belum++;
}

});


totalIuran.innerHTML =
"Rp " + jumlahUang.toLocaleString("id-ID");


sudahLunas.innerHTML = lunas;

belumLunas.innerHTML = belum;


}catch(error){

console.log(error);

}


}

hitung();



// =====================
// PENGUMUMAN TERBARU
// =====================

const listPengumuman =
document.getElementById("pengumumanTerbaru");


async function tampilPengumuman(){

try{


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


}catch(error){

console.log(error);

}


}


tampilPengumuman();




// =====================
// KEGIATAN TERBARU
// =====================


const listKegiatan =
document.getElementById("kegiatanTerbaru");


async function tampilKegiatan(){


try{


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


}catch(error){

console.log(error);

}


}


tampilKegiatan();




// =====================
// IURAN TERBARU
// =====================


const listIuran =
document.getElementById("iuranTerbaru");



async function tampilIuran(){


try{


listIuran.innerHTML="";


const q=query(

collection(db,"iuran"),

orderBy("createdAt","desc"),

limit(5)

);



const snapshot = await getDocs(q);



snapshot.forEach((doc)=>{


const data = doc.data();


listIuran.innerHTML += `

<div class="card">

<h3>${data.nama}</h3>

<p>
Jumlah : Rp ${Number(data.jumlah || 0).toLocaleString("id-ID")}
</p>

<p>
Status : ${data.status}
</p>

</div>

`;


});


}catch(error){

console.log(error);

}


}


tampilIuran();