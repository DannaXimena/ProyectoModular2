const express = require('express');
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path'); // Para manejar rutas relativas de archivos

// Crear una aplicación Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost', //  dirección  MySQL
  user: 'root', 
  password: 'root', 
  database: 'usuariosDB',
});

// Verificar la conexión 
db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos: ', err);
  } else {
    console.log('Conectado a la base de datos');
  }
});

// Ruta de login
app.post('login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Ingresa nombre de usuario y contraseña.' });
  }

  // Buscar al usuario en la base de datos
  const query = 'SELECT * FROM usuarios WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error al realizar la consulta: ', err);
      return res.status(500).json({ error: 'Hubo un problema con la base de datos.' });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado.' });
    }

    // Aquí deberías comparar la contraseña con un hash en la base de datos, por ahora lo comparo directamente
    const user = results[0];
    
    if (user.password !== password) {
      return res.status(400).json({ error: 'Contraseña incorrecta.' });
    }

    // Si las credenciales son correctas
    res.status(200).json({ message: 'Login exitoso', user });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
