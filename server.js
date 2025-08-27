// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Cambia esto si el nombre de tu proyecto en dist/ es diferente
const DIST_FOLDER = path.join(__dirname, 'dist/control-gastos-front');

app.use(express.static(DIST_FOLDER));

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_FOLDER, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});