const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

// adding express middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


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