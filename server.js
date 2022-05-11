const express = require("express");
const mysql = require("mysql2");
const inputCheck = require("./utils/inputCheck");
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

// GET all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;
    
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'sucess',
            data: rows
        });
    });
});

// Get a single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        } 
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Delete a candidate
app.delete('/api/candidate/:id', (req, res) => { 
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({ message: 'Candidate not found' });
            return;
        } 
        res.json({ 
            message: 'deleted',
            changes: result.affectedRows,
            id: req.params.id
        });
    });
});

// Create new candidate
app.post('/api/candidate', ({ body }, res ) => {
    const errors = inputCheck(body, 'first_name','last_name','industry_connected');
    if (errors) {
        res.status(400).json({ error: errors });
        return;   
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES(?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});



// Setting a default response if the request it's not supported by the app
app.use((req, res) => {
    res.status(404).end();
})

// starting Express Server on Port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
