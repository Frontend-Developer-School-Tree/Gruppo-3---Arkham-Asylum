const btnCloseLogin = document.querySelector('#btnLogin');


const redirectModal = () => {

    document.location.href = 'index.html'
}

btnCloseLogin.addEventListener('click', redirectModal);
