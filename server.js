const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
// Límite alto para permitir que pasen las imágenes en Base64
app.use(express.json({ limit: '50mb' })); 

// Memoria volátil para guardar el estado del galpón
let estadoGalpon = {}; 

// 1. La Raspberry Pi (Java) envía los datos aquí mediante el POST
app.post('/api/sync', (req, res) => {
    estadoGalpon = req.body;
    res.status(200).send({ status: "OK", timestamp: Date.now() });
});

// 2. Tu index.html lee los datos desde aquí
app.get('/api/data', (req, res) => {
    res.json(estadoGalpon);
});

// 3. Alojar tu página web estática (index.html) automáticamente
app.use(express.static(path.join(__dirname, '')));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Zentinel Cloud Server corriendo en el puerto ${PORT}`);
});
