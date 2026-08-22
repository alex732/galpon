const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression'); // <--- LIBRERÍA DE OPTIMIZACIÓN

const app = express();
app.use(cors());
app.use(compression()); // <--- COMPRIME LOS DATOS EN UN 80%
app.use(express.json({ limit: '50mb' })); 

let estadoGalpon = {}; 

app.post('/api/sync', (req, res) => {
    estadoGalpon = req.body;
    res.status(200).send({ status: "OK", timestamp: Date.now() });
});

app.get('/api/data', (req, res) => {
    res.json(estadoGalpon);
});

app.use(express.static(path.join(__dirname, '')));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Zentinel Cloud Optimizado corriendo en puerto ${PORT}`);
});
