const containerDetenuto = document.getElementById('containerDetenuti');
const tplDet = document.getElementById('tplDetenuti');
const urlDet = '../db/detenuti.json'

class Detenuto {
    static async getDetenuto(){

        // VERSIONE GRUPPO
        //try {
            // console.log('ok')
            const response = await fetch('../db/detenuti.json');
            const data = await response.json();
            // console.log(data);

            data.map(detenuto => {
                const cardDet = document.importNode(tplDet.content, true);
                // console.log(detenuto.nomePersonaggio)
                
                cardDet.querySelector('.nome').textContent= detenuto.nomePersonaggio;
                cardDet.querySelector('.razza').textContent = 'Razza: ' + detenuto.razza;
                cardDet.querySelector('.coloreOcchi').textContent = 'Colore occhi: ' + detenuto.caratteristicheFisiche.coloreOcchi;
                cardDet.querySelector('.coloreCapelli').textContent = 'Colore capelli: ' + detenuto.caratteristicheFisiche.coloreCapelli;
                cardDet.querySelector('.altezza').textContent =  'Altezza: ' + detenuto.caratteristicheFisiche.altezza;
                cardDet.querySelector('.peso').textContent = 'Peso: ' + detenuto.caratteristicheFisiche.peso;

                return containerDetenuto.appendChild(cardDet);
            })
     //   } catch (error) {
       //     console.error(error);
        //}

        //VERSIONE ANDREA
        /* const detenuti = await Promise (urlDet =>{
            try {
                return fetch(urlDet).then(response => response.json());
            } catch (error) {
                return error;
            }
        })
        console.log(detenuti) */
        // detenuti.map(detenuto => {

        //     const cardDetenuto = document.importNode(tplDet.content, true);
        //     // console.log(cardDetenuto)
        //     cardDetenuto.querySelector('.nome').textContent = detenuto.nomePersonaggio;



        //     containerDetenuto.append(cardDetenuto);
        // })
        
        // const nomeDetenuto;
        // const razzaDetenuto;
        // const caratteristicheDetenuto;
        // const livelloDetenuto;
    }
}

Detenuto.getDetenuto();