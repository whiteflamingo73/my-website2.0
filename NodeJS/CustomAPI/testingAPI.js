



async function run() {
    const apiFetch = await fetch('http://127.0.0.1:3000/greeting')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(`Error: ${error}`));

    console.log(apiFetch);
}

const start = document.getElementById('start');

start.addEventListener('click', run());

