console.log("Hello world")

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/hiss'

loadingElement.style.display = "none";

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
        });
});
