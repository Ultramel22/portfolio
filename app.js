 

const express = require('express');
const fs = require("fs");
const expressNunjucks = require('express-nunjucks');


const app = express();

app.set('views', __dirname + '/templates');

const njk = expressNunjucks(app, {
    watch: true, 
    noCache: true
});


app.get('/', (req, res) => {
    res.render('pages/index', {
        test: new Date().getTime()
    });
});

app.get('/about/', (req, res) => {
    res.render('pages/about');
});

app.get('/design/', (req, res) => {
    res.render('pages/design');
});

app.get('/code/', (req, res) => {
    res.render('pages/code');
});

app.get('/contact/', (req, res) => {
    res.render('pages/contact');
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


