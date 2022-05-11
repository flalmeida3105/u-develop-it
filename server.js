const express = require("express");
const mysql = require("mysql2");
const { nextTick } = require("process");
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

// GET a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 0`, (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row);
// });

// // Delete a candidate
// // db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
// //     if (err) {
// //         console.log(err);
// //     }
// //     console.log(result);
// // });

// // Pre-requisites for creating new candidate
// // define sql query
// const sql = `INSERT INTO candidates(id, first_name, last_name, industry_connected) VALUES(?,?,?,?)`;
// // define sql parameters 
// const params = [1, 'Ronald', 'Firbank', 1];
// // creating candidate
// db.query(sql, params, (err, result) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result)
// });

// // Setting a default response if the request it's not supported by the app
// app.use((req, res) => {
//     res.status(404).end();
// })

// starting Express Server on Port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
