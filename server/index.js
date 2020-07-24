const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/hisser');
const hisses = db.get('hisses');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hisssssss 🐊🦎'
    });
});

function isValidHiss(hiss) {
    return hiss.name && hiss.name.toString().trim() !== '' &&
        hiss.name && hiss.name.toString().trim() !== '';
}

app.post('/hiss', (req, res) => {
    if (isValidHiss(req.body)) {
        const hiss = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        };

        hisses
            .insert(hiss)
            .then(createdHiss => {
                res.json(createdHiss)
            });
    } else {
        res.status(422)
        res.json({
            message: 'Hey! Name and Content are required!'
        });
    }
});

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000')
});