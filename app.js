 

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
            headers: {
              'Content-Type': 'application/json',
                "authority" : "www.instagram.com",
                "method": "GET",
                "path": "/melange_designs/?__a=1",
                "scheme": "https",
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9",
                "cookie": 'ig_did=E59537F7-63A2-4F1F-B246-EA7E252E3E92; mid=XoHMawALAAGEGLw8efrAkuLKVzCN; csrftoken=qQPZY8oLErCxmir3EomdXs0fZtXF84zt; fbm_124024574287414=base_domain=.instagram.com; fbsr_124024574287414=Cw6Egpv2p2u-fImkejFxiq0cN0PHoEgx0Y49Zk-kAlA.eyJ1c2VyX2lkIjoiMTQ5MjY4OTYyMSIsImNvZGUiOiJBUUJpZ3V1TThGd3Bnc2x1T2NGZkhxRm04NGJ4cWV2ZTFZOHVnNjZQb052clF1T2Iwb0FPYUV0MjZGODhocmJKQTktOXFNWmZ0TWtNNHUtUnFGYnpsYjNTbmRFeGlRazlqWlpsSnFsQWJXQl9YYmtQVHRlTlBHVGVUX2ZHMWgxc0ljekl4eGZCc3g2aDFOaEowNmR1RHVKVmZ4V1FyVVUtOTh6RlNTR2taV0ZieWRCMzBlTE9FNGNuT0s1cC1OdTVuWHRjX2tYRExyNUxQbEx3WVlubEZnZ2RBWTdEM2pfZjNRNlk5RjdnUExYZHRHQTYtdWRWMWd5QVNtU1AwVUdsS05yd19FVmxNS0IyZHltRzFkVW0tYjBfVDN3a2x0NXhOX1o0cjM5NUFQcDNFNWVvOFNIeUozOXhhbFlROWVldHNZTSIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFGd2c3YVV0ZUpaQjNyNGhhaUd2RE05WkJQQkVkaFl4aVFsRlI0akw1Z01ZRGU5ZzVGaXNqUmJGNm5LMWs0SUJsbTY3SVVNdGUzYkVIQ21DT1hGYTNlWU9FY21aQ1FkaDdPMEZmVEUxZFF2ZVhGaHZha2JTd1dPVHc5Y09ybHVSd1pBelNLejZDaXRMcjd5S1JMWkJwVHA0V2tKbnFld1pEWkQiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTU5OTg5NzMyOX0; urlgen="{\"165.0.4.33\"" 37053}"1kH2Hl"W8XqsGMBAHV2DyJYHGp68cx7nkE"',
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "none",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36"
            }
          });
        const instagramJSON = await instagramData.json();
        instagramPosts = instagramJSON.graphql.user.edge_owner_to_timeline_media.edges.map((item) => item.node);
   

    } catch (error){




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


