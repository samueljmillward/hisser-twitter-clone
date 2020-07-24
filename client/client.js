console.log("Hello world")

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const hissesElement = document.querySelector('.hisses')
const API_URL = 'http://localhost:5000/hisses'

loadingElement.style.display = '';

listAllHisses();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const hiss = {
        name,
        content
    };

    form.style.display = 'none';
    loadingElement.style.display = '';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(hiss),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
        .then(createdHiss => {
            console.log(createdHiss);
            form.reset();
            form.style.display = '';
            loadingElement.style.display = 'none'
        });
});

function listAllHisses() {
    fetch(API_URL)
        .then(response => response.json())
        .then(hisses => {
            hisses.reverse();
            hisses.forEach(hiss => {
                const div = document.createElement('div');

                const header = document.createElement('h3')
                header.textContent = hiss.name;

                const contents = document.createElement('p');
                contents.textContent = hiss.content;

                const date = document.createElement('small')
                date.textContent = new Date(hiss.created);

                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date);

                hissesElement.appendChild(div);
            });
            loadingElement.style.display = 'none'
        });
};
