const containerDetenuto = document.getElementById("containerDetenuti");
const containerGuardie = document.getElementById("containerGuardie");
const tplDet = document.getElementById("tplDetenuti");
const urlDet = "../db/detenuti.json";
const categorieVisualizzazione = document.getElementById(
    "btnVisualizzaCategoria"
);
const selectCategories = document.getElementById("selectCategories");

class Detenuto {
    static async getDetenuto() {
        try {
            const response = await fetch("../db/detenuti.json");
            const data = await response.json();
            // console.log(data);

            data.map((detenuto) => {
                const cardDet = document.importNode(tplDet.content, true);
                // console.log(detenuto.nomePersonaggio)

                cardDet.querySelector(".nome").textContent =
                    detenuto.nomePersonaggio;
                cardDet.querySelector(".idDetenuto").textContent =
                    detenuto.fascicoli.id;
                cardDet.querySelector(".razza").textContent =
                    "Razza: " + detenuto.razza;
                cardDet.querySelector(".coloreOcchi").textContent =
                    "Colore occhi: " +
                    detenuto.caratteristicheFisiche.coloreOcchi;
                cardDet.querySelector(".coloreCapelli").textContent =
                    "Colore capelli: " +
                    detenuto.caratteristicheFisiche.coloreCapelli;
                cardDet.querySelector(".altezza").textContent =
                    "Altezza: " + detenuto.caratteristicheFisiche.altezza;
                cardDet.querySelector(".peso").textContent =
                    "Peso: " + detenuto.caratteristicheFisiche.peso;
                cardDet.querySelector(".livelloDiPericolo").textContent =
                    "Pericolo: " + detenuto.livelloDiPericolo;

                cardDet.querySelector(".reato").textContent =
                    "Reato: " + detenuto.fascicoli.reato;

                cardDet.querySelector(".dataIngresso").textContent =
                    "Incercerato il: " + detenuto.fascicoli.dataCarcerazione;

                //controllo lo stato e vedo se e' avvenuto prima della data di scarcerazione
                cardDet.querySelector(".dataScarcerazione").textContent =
                    detenuto.fascicoli.stato[1] <
                    detenuto.fascicoli.dataScarcerazione
                        ? `il detenuto e' ${detenuto.fascicoli.stato[0]} nel ${detenuto.fascicoli.stato[1]}`
                        : `data di scarcerazione: ${detenuto.fascicoli.dataScarcerazione}`;

                return containerDetenuto.appendChild(cardDet);
            });
        } catch (error) {
            console.error(error);
        }
    }
}

class Guardie {
    static async getGuardia() {
        try {
            //!da riempire
        } catch (error) {
            console.error;
        }
    }
}

// Detenuto.getDetenuto();

categorieVisualizzazione.addEventListener("click", handleCategories);

function handleCategories() {
    // console.log(selectCategories.value);
    if (selectCategories.value === "detenuti") {
        //rendo il div dei detenuti visibile
        containerDetenuto.classList.remove("invisible");
        //e rendo invisibile l'altro div
        containerGuardie.classList.add("invisible");
        //chiamo la funzione per stampare le card dei detenuti
        Detenuto.getDetenuto();
    } else if (selectCategories.value === "guardie") {
        //rendo il div dei detenuti visibile
        containerGuardie.classList.remove("invisible");
        //e rendo invisibile l'altro div
        containerDetenuto.classList.add("invisible");
        //chiamo la funzione per stampare le card dei detenuti
        Guardie.getGuardia();
    }
}
