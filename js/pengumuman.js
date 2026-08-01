import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const form = document.getElementById("formPengumuman");
const list = document.getElementById("listPengumuman");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const judul = document.getElementById("judul").value;
    const isi = document.getElementById("isi").value;

    await addDoc(collection(db, "pengumuman"), {
        judul,
        isi,
        createdAt: serverTimestamp()
    });

    form.reset();

    tampilPengumuman();

});

async function tampilPengumuman() {

    list.innerHTML = "";

    const snapshot = await getDocs(collection(db, "pengumuman"));

    snapshot.forEach((item) => {

        const data = item.data();

        list.innerHTML += `

        <div class="card">

            <h3>${data.judul}</h3>

            <p>${data.isi}</p>

            <button onclick="hapus('${item.id}')">
                Hapus
            </button>

        </div>

        `;

    });

}

window.hapus = async(id)=>{

await deleteDoc(doc(db,"pengumuman",id));

tampilPengumuman();

}

tampilPengumuman();