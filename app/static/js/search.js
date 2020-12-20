const searchButton = document.getElementById('search-t');

searchButton.onclick = () => {
    const category = document.querySelector('.search-block > select').value;
    const fetchData = {
        method: 'POST',
        body: JSON.stringify({category: category}),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }

    fetch('/trainer/searchTrainer', fetchData)
    .then(response => response.json()).then(result => {
        console.log(result);
        const trainersBlock = document.querySelector('.trainers-block');
        trainersBlock.innerHTML = `<div class="trainer">
            <div class="trainer-name">${result.name}</div>
            <div class="trainer-id"><button data-id=${result.id}>Записаться!</button></div>
        </div>`;
    });

}