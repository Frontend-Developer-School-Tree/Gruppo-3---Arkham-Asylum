const tplDet = document.getElementById("tplDetenuti");
const tplGuarie = document.getElementById("tplGuardie");
const containerDetenuto = document.getElementById("containerDetenuti");
const containerGuardie = document.getElementById("containerGuardie");
const btnAddGuardia = document.getElementById("btnAddGuardia");
const urlDet = "../db/detenuti.json";
const urlGuardie = "../db/guardie.json";
const categorieVisualizzazione = document.getElementById(
    "btnVisualizzaCategoria"
);
const selectCategories = document.getElementById("selectCategories");

class Detenuto {
    constructor(nome, razza, colOcchi, colCapelli, altezza, peso, pericolo, reato, ingresso, scarcerazione) {
        this.nome = nome;
        this.razza = razza;
        this.colOcchi = colOcchi;
        this.colCapelli = colCapelli;
        this.altezza = altezza;
        this.peso = peso;
        this.pericolo = pericolo;
        this.reato = reato;
        this.ingresso = ingresso;
        this.scarcerazione = scarcerazione;
    }
    static async getDetenuto() {
        try {
            const response = await fetch(urlDet);
            const data = await response.json();
            // console.log(data);

            data.map((detenuto) => {
                const cardDet = document.importNode(tplDet.content, true);
                // console.log(detenuto.nomePersonaggio)

                cardDet.querySelector(".nome").textContent =
                    detenuto.nomePersonaggio;
                cardDet.querySelector(
                    ".idDetenuto"
                ).textContent = `ID: ${detenuto.fascicoli.id}`;
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

class Guardia {
    constructor(nome, natoIl) {
        this.nome = nome;
        this.natoIl = natoIl;
    }
    static async getGuardia() {
        try {
            const response = await fetch(urlGuardie);
            const data = await response.json();

            data.map((guardia) => {
                const cardGuardia = document.importNode(
                    tplGuardie.content,
                    true
                );

                cardGuardia.querySelector(".nome").textContent =
                    guardia.nomeGuardia;

                cardGuardia.querySelector(
                    ".idGuardia"
                ).textContent = `ID: ${guardia.idGuardia}`;

                cardGuardia.querySelector(".natoIl").textContent =
                    guardia.natoIl;

                return containerGuardie.appendChild(cardGuardia);
            });
        } catch (error) {
            console.error;
        }
    }
}

Detenuto.getDetenuto();
Guardia.getGuardia();

categorieVisualizzazione.addEventListener("click", handleCategories);

function handleCategories() {
    // console.log(selectCategories.value);
    if (selectCategories.value === "detenuti") {
        //rendo il div dei detenuti visibile
        containerDetenuto.classList.remove("invisible");
        //e rendo invisibile l'altro div
        containerGuardie.classList.add("invisible");
    } else if (selectCategories.value === "guardie") {
        //rendo il div dei detenuti visibile
        containerGuardie.classList.remove("invisible");
        //e rendo invisibile l'altro div
        containerDetenuto.classList.add("invisible");
    }
}

btnAddGuardia.addEventListener("click", handleAddGuardia);

function handleAddGuardia(e) {
    e.preventDefault();
    const inputNomeGuardia = document.querySelector("#inputNome").value;
    const inputNatoGuardia = document.querySelector("#inputNato").value;
    if (inputNomeGuardia === "" && inputNatoGuardia === "") {
        alert("inserisci un nome");
    } else {
        const newGuardia = new Guardia(inputNomeGuardia, inputNatoGuardia);
        //voglio aggiungerlo al #containerGuardie
        //clono il template
        const cardGuardia = document.importNode(tplGuardie.content, true);
        cardGuardia.querySelector(".nome").textContent = newGuardia.nome;
        let id = recuperaIdGuardia();
        cardGuardia.querySelector(".idGuardia").textContent = `ID: ${id}`;

        cardGuardia.querySelector(".natoIl").textContent = newGuardia.natoIl;

        return containerGuardie.appendChild(cardGuardia);
    }
}

function recuperaIdGuardia() {
    let contGuardie = document.getElementById("containerGuardie");
    let prevGuardia = contGuardie.lastElementChild;
    let idLast = prevGuardia.querySelector(".idGuardia").textContent;

    let id = parseInt(idLast.slice(4));
    return id + 1;
}

const btnAddDetenuto = document.getElementById('btnAddDetenuto');

btnAddDetenuto.addEventListener('click', handleAddDetenuto)


function handleAddDetenuto(e) {
    e.preventDefault();
    const inputNomeDetenuto = document.querySelector("#inputNomeDet").value;
    const inputRazzaDetenuto = document.querySelector("#inputRazza").value;
    const inputColoreOcchiDetenuto = document.querySelector("#inputColoreOcchi").value;
    const inputColoreCapelliDetenuto = document.querySelector("#inputColoreCapelli").value;
    const inputAltezzaDetenuto = document.querySelector("#inputAltezza").value;
    const inputPesoDetenuto = document.querySelector("#inputPeso").value;
    const inputPericoloDetenuto = document.querySelector("#inputPericolo").value;
    const inputReatoDetenuto = document.querySelector("#inputReato").value;
    const inputIngressoDetenuto = document.querySelector("#inputIngresso").value;
    const inputScarcerazioneDetenuto = document.querySelector("#inputScarcerazione").value;

    if (inputNomeDetenuto === "" && inputRazzaDetenuto === "") {
        alert("compila i campi");
    } else {
        const newDetenuto = new Detenuto(inputNomeDetenuto, inputRazzaDetenuto, inputColoreOcchiDetenuto, inputColoreCapelliDetenuto, inputAltezzaDetenuto, inputPesoDetenuto, inputPericoloDetenuto, inputReatoDetenuto, inputIngressoDetenuto, inputScarcerazioneDetenuto);
        //voglio aggiungerlo al #containerGuardie
        //clono il template
        const cardDetenuto = document.importNode(tplDetenuti.content, true);
        cardDetenuto.querySelector(".nome").textContent = newDetenuto.nome;
        let id = recuperaIdDetenuto();
        cardDetenuto.querySelector(".idDetenuto").textContent = `ID: ${id}`;

        cardDetenuto.querySelector(".razza").textContent = "Razza: " + newDetenuto.razza;
        cardDetenuto.querySelector(".coloreOcchi").textContent = "Colore Occhi: " + newDetenuto.colOcchi;
        cardDetenuto.querySelector(".coloreCapelli").textContent = "Colore Capelli: " + newDetenuto.colCapelli;
        cardDetenuto.querySelector(".altezza").textContent = "Altezza: " + newDetenuto.altezza;
        cardDetenuto.querySelector(".peso").textContent = "Peso: " + newDetenuto.peso;
        cardDetenuto.querySelector(".livelloDiPericolo").textContent = "Pericolo: " + newDetenuto.pericolo;
        cardDetenuto.querySelector(".reato").textContent = "Reato: " + newDetenuto.reato;
        cardDetenuto.querySelector(".dataIngresso").textContent = "Incarcerato il: " + newDetenuto.ingresso;
        cardDetenuto.querySelector(".dataScarcerazione").textContent = "Data di Scarcerazione: " + newDetenuto.scarcerazione;        

        return containerDetenuto.appendChild(cardDetenuto);
    }
}

function recuperaIdDetenuto() {
    let contDetenuti = document.getElementById("containerDetenuti");
    let prevDetenuti = contDetenuti.lastElementChild;
    let idLast = prevDetenuti.querySelector(".idDetenuto").textContent;

    let id = parseInt(idLast.slice(4));
    return id + 1;
}