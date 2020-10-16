

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
    let instagramPosts = [];

    try{

        const instagramData = await fetch("https://www.instagram.com/melange_designs/?__a=1", {
            method: 'GET',
            credentials: "same-origin",
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9,de;q=0.8,pt;q=0.7,af;q=0.6",
                "cache-control": "max-age=0",
                "cookie": "mcd=3; mid=W7shjgAEAAHDnSTXTv6xwb_x_XOX; csrftoken=CNnCB5TAH1MSV9uIK4mHW70HqZw2XiRa; ds_user_id=1307432; sessionid=1307432%3A11u5rMnJhhUS5s%3A19; ig_did=F699BA6A-E70E-4268-8C44-4E48680752EC; shbid=4773; shbts=1600764170.798899; rur=RVA; urlgen=\"{\"196.250.193.3\": 327987\054 \"105.233.91.219\": 36874}:1kL2wY:VvceUKewQpQULRor_OmHEjcAcAg\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "none",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
            }
          });
        const instagramJSON = await instagramData.json();

        instagramPosts = instagramJSON.graphql.user.edge_owner_to_timeline_media.edges.map((item) => item.node);


    } catch (error){


        console.log(error);

    }

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

app.get('/resume/', (req, res) => {
    res.render('pages/resume');
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


