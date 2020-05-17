require('dotenv').config();
const express = require('express')
var request = require('request'); // "Request" library
const cors = require('cors')
const app = express()
const port = 3005
const fetch = require('node-fetch')
const querystring = require('querystring');

var client_id = 'e15dcd46e3cd4222962b20229fb4f9e7'; // Your client id
var client_secret = '792a60dde9ae4b97847a2c777e171f9f'; // Your secret
var redirect_uri = 'http://localhost:3005/authCallback'; // Your redirect uri

app.use(cors())

app.get('/login', async (req, res) => {
    console.log('hello')
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
    }));

})

app.get('/authCallback', async(req, res) => {
    console.log(req.query.code)
    console.log('here')

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: req.query.code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        console.log(body)
        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:4200/' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
        }));
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))