const express = require('express');
const QRCode = require('qrcode');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta principal
app.get('/etiquetas', async (req, res) => {
  const modo = req.query.modo || 'individual';
  const idBase = req.query.id || '';
  const version = req.query.version || '1.0';
  const largoIndividual = 8;
  const largoSerie = 7

  const now = new Date();
  const fecha = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

  let etiquetas = [];

  console.log(modo)
  if (modo === 'individual') {
    if (idBase.length !== largoIndividual) {
      return res.status(400).send('El ID debe tener exactamente 8 dígitos en modo individual.');
    }

    const contenidoQR = JSON.stringify({ id: idBase, version, fecha });
    const qrBase64 = await QRCode.toDataURL(contenidoQR);
    etiquetas.push({ id: idBase, version, fecha, qrBase64 });

  } else if (modo === 'serie') {
    if (idBase.length !== largoSerie) {
      return res.status(400).send('El ID base debe tener 7 dígitos en modo serie.');
    }

    for (let i = 0; i < 16; i++) {
      const hex = i.toString(16).toUpperCase();
      const fullId = `${idBase}${hex}`;
      const contenidoQR = JSON.stringify({ id: fullId, version, fecha });
      const qrBase64 = await QRCode.toDataURL(contenidoQR);
      etiquetas.push({ id: fullId, version, fecha, qrBase64 });
    }
  } else {
    return res.status(400).send('Modo no válido. Usar "individual" o "serie".');
  }

  res.render('etiqueta', { etiquetas }); // Vista singular
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
