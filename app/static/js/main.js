const trButton = document.getElementById('trAuth');
const clButton = document.getElementById('clAuth');
const filter = document.getElementById('filter');
const modal = document.querySelector('.modal-auth');

trButton.onclick = () => {
    showModalAuth();
}

clButton.onclick = () => {
    showModalAuth();
}

filter.onclick = () => {
    filter.style.display = 'none';
    modal.style.display = 'none';
}

function showModalAuth(){
    filter.style.display = 'block';
    modal.style.display = 'block';
}