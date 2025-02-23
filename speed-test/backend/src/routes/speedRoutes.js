const express = require('express');
const router = express.Router();

// Ruta para medir latencia
router.get('/ping', (req, res) => {
    res.send('pong');
});

// Ruta para descargar un archivo de prueba (10 MB)
router.get('/download', (req, res) => {
    const fileSize = 10 * 1024 * 1024; // 10 MB en bytes
    const buffer = Buffer.alloc(fileSize, 'a'); // Archivo dummy
    res.setHeader('Content-Length', fileSize);
    res.send(buffer);
});

// Ruta para medir velocidad de subida
router.post('/upload', express.raw({ limit: '50mb' }), (req, res) => {
    res.send('Upload recibido');
});

module.exports = router;