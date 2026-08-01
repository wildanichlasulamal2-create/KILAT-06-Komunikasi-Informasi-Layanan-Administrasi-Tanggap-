import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const form=document.getElementById("formWarga");
const list=document.getElementById("listWarga");
const cari=document.getElementById("cari");
const btn=document.getElementById("btnSimpan");

let semua=[];

// =====================
// LOAD
// =====================

async function loadData(){

semua=[];

const snapshot=await getDocs(collection(db,"warga"));

snapshot.forEach((item)=>{

semua.push({
id:item.id,
...item.data()
});

});

tampil(semua);

}

loadData();

// =====================
// TAMPIL
// =====================

function tampil(data){

list.innerHTML="";

data.forEach((w)=>{

list.innerHTML+=`

<tr>

<td>${w.nik}</td>

<td>${w.nama}</td>

<td>${w.alamat}</td>

<td>${w.telepon}</td>

<td>

<button onclick="editData('${w.id}')">
✏️
</button>

<button onclick="hapus('${w.id}')">
🗑️
</button>

</td>

</tr>

`;

});

}

// =====================
// SIMPAN
// =====================

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const id=document.getElementById("editId").value;

const data={

nik:nik.value,
nama:nama.value,
alamat:alamat.value,
telepon:telepon.value

};

if(id==""){

await addDoc(collection(db,"warga"),{

...data,
createdAt:serverTimestamp()

});

}else{

await updateDoc(doc(db,"warga",id),data);

btn.innerHTML="Simpan Data";

document.getElementById("editId").value="";

}

form.reset();

loadData();

});

// =====================
// EDIT
// =====================

window.editData=(id)=>{

const data=semua.find(x=>x.id==id);

nik.value=data.nik;

nama.value=data.nama;

alamat.value=data.alamat;

telepon.value=data.telepon;

document.getElementById("editId").value=id;

btn.innerHTML="Update Data";

}

// =====================
// HAPUS
// =====================

window.hapus=async(id)=>{

if(confirm("Hapus data ini?")){

await deleteDoc(doc(db,"warga",id));

loadData();

}

}

// =====================
// CARI
// =====================

cari.addEventListener("keyup",()=>{

const key=cari.value.toLowerCase();

const hasil=semua.filter(x=>

x.nama.toLowerCase().includes(key)||

x.nik.toLowerCase().includes(key)

);

tampil(hasil);

});
