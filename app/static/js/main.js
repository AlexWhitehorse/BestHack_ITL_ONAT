const trButton = document.getElementById('trAuth');
const clButton = document.getElementById('clAuth');
const filter = document.getElementById('filter');
const modal = document.querySelector('.modal-auth');
const startButton = document.getElementById('startButton');
const authButton = document.getElementById('authButton');
const regButton = document.getElementById('regButton');

trButton.onclick = () => {
    window.location="/workout/list-t";
}

clButton.onclick = () => {
    window.location="/workout/list"
}

filter.onclick = () => {
    filter.style.display = 'none';
    modal.style.display = 'none';
}

startButton.onclick = () => {
    showModalAuth();
}

authButton.onclick = () => {
    document.querySelector('.modal-type-reg').style.display = 'none';
    document.querySelector('.modal-type-login').style.display = 'block';
}

regButton.onclick = () => {
    document.querySelector('.modal-type-reg').style.display = 'block';
    document.querySelector('.modal-type-login').style.display = 'none';
}

function showModalAuth(){
    filter.style.display = 'block';
    modal.style.display = 'block';
}