const http = require('http');
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8mb4',
});

const PORT = 3000;

http.createServer(async (req, res) => {
  if (req.url !== '/') {
    res.writeHead(404);
    return res.end();
  }

  try {
    const [servicios] = await db.query('SELECT id, nombre, tipo, estado FROM servicios ORDER BY id');

    const filas = servicios.map((s) => `
      <tr class="servicio">
        <td>${s.id}</td>
        <td>${s.nombre}</td>
        <td>${s.tipo}</td>
        <td>${s.estado}</td>
      </tr>`).join('');

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Inventario de servicios Cloud</title>
  <style>
    body { font-family: sans-serif; margin: 2rem; }
    table { border-collapse: collapse; }
    th, td { border: 1px solid #ccc; padding: .5rem 1rem; text-align: left; }
    th { background: #eee; }
  </style>
</head>
<body>
  <h1>Inventario de servicios Cloud</h1>
  <p>Total de servicios: <strong id="total">${servicios.length}</strong></p>
  <table>
    <tr><th>ID</th><th>Nombre</th><th>Tipo</th><th>Estado</th></tr>
    ${filas}
  </table>
</body>
</html>`);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Error al consultar la base de datos: ${err.message}\n`);
  }
}).listen(PORT, () => console.log(`App escuchando en puerto ${PORT}`));
