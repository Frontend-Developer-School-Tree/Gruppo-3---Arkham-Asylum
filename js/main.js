class Detenuto {
    static async getDetenuto(){
        try {
            // console.log('ok')
            const response = await fetch('../db/detenuti.json');
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }


        // const nomeDetenuto;
        // const razzaDetenuto;
        // const caratteristicheDetenuto;
        // const livelloDetenuto;
    }
}

Detenuto.getDetenuto();