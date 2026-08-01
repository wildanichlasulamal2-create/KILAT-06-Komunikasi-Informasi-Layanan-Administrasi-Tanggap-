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

const form=document.getElementById("formKegiatan");
const list=document.getElementById("listKegiatan");
const cari=document.getElementById("cari");
const btn=document.getElementById("btnSimpan");
const editId=document.getElementById("editId");

let semua=[];

async function loadData(){

semua=[];

const snapshot=await getDocs(collection(db,"kegiatan"));

snapshot.forEach((item)=>{

semua.push({
id:item.id,
...item.data()
});

});

tampil(semua);

}

loadData();

function tampil(data){

list.innerHTML="";

data.forEach((k)=>{

list.innerHTML+=`

<tr>

<td>${k.nama}</td>
<td>${k.tanggal}</td>
<td>${k.waktu}</td>
<td>${k.lokasi}</td>

<td>

<button onclick="editData('${k.id}')">✏️</button>

<button onclick="hapusData('${k.id}')">🗑️</button>

</td>

</tr>

`;

});

}

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const data={

nama:nama.value,
tanggal:tanggal.value,
waktu:waktu.value,
lokasi:lokasi.value,
deskripsi:deskripsi.value

};

if(editId.value==""){

await addDoc(collection(db,"kegiatan"),{

...data,

createdAt:serverTimestamp()

});

}else{

await updateDoc(doc(db,"kegiatan",editId.value),data);

btn.innerHTML="Simpan Kegiatan";

editId.value="";

}

form.reset();

loadData();

});

window.editData=(id)=>{

const d=semua.find(x=>x.id==id);

nama.value=d.nama;
tanggal.value=d.tanggal;
waktu.value=d.waktu;
lokasi.value=d.lokasi;
deskripsi.value=d.deskripsi;

editId.value=id;

btn.innerHTML="Update Kegiatan";

}

window.hapusData=async(id)=>{

if(confirm("Hapus kegiatan ini?")){

await deleteDoc(doc(db,"kegiatan",id));

loadData();

}

}

cari.addEventListener("keyup",()=>{

const key=cari.value.toLowerCase();

const hasil=semua.filter(x=>

x.nama.toLowerCase().includes(key)||
x.lokasi.toLowerCase().includes(key)

);

tampil(hasil);

});
