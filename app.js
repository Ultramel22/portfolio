 

const express = require('express');
const fs = require("fs");


const app = express();

app.get('/', (req, res) => {
    res.status(200).send(fs.readFileSync("pages/index.html").toString()).end();
});

app.get('/about/', (req, res) => {
    res.status(200).send(fs.readFileSync("pages/about.html").toString()).end();
});

app.get('/design/', (req, res) => {
    res.status(200).send(fs.readFileSync("pages/about.html").toString()).end();
});

app.get('/code/', (req, res) => {
    res.status(200).send(fs.readFileSync("pages/about.html").toString()).end();
});

app.get('/contact/', (req, res) => {
    res.status(200).send(fs.readFileSync("pages/about.html").toString()).end();
});

app.use("/static", express.static('static'));





// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;


