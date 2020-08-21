 

const express = require('express');
const fs = require("fs");
const expressNunjucks = require('express-nunjucks');
const fetch = require('isomorphic-fetch');


const app = express();

app.set('views', __dirname + '/templates');

const njk = expressNunjucks(app, {
    watch: true, 
    noCache: true
});


app.get('/', async (req, res) => {

    const instagramData = await fetch("https://www.instagram.com/melange_designs/?__a=1");
    const instagramJSON = await instagramData.json();
    const instagramPosts = instagramJSON.graphql.user.edge_owner_to_timeline_media.edges.map((item) => item.node);

    res.render('pages/index', {
        instagramPosts,
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


