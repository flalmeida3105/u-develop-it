const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express();

// adding express middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection({
    host: '127.0.0.1',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Passw0rd',
    database: 'election'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});

// starting Express Server on Port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Testing route
// app.get('/', (req, res) => {
//     res.json({
//         message: 'Hello'
//     });
// })

// Setting a default response if the request it's not supported by the app
app.use((req, res) => {
    res.status(404).end();
})