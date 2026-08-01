import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const selectWarga = document.getElementById("warga");

// ======================
// LOAD DATA WARGA
// ======================

async function loadWarga() {

    selectWarga.innerHTML = `
        <option value="">Pilih Warga</option>
    `;

    const snapshot = await getDocs(collection(db, "warga"));

    snapshot.forEach((doc) => {

        const data = doc.data();

        selectWarga.innerHTML += `
            <option value="${doc.id}">
                ${data.nama}
            </option>
        `;

    });

}

loadWarga();
