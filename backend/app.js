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
var redirect_uri = 'http://spotifygrabber.mooo.com:3005/authCallback'; // Your redirect uri

app.use(cors())

app.get('/', async (req,res) => {
  res.redirect('http://spotifygrabber.mooo.com:4200/')
})

app.get('/login', async (req, res) => {
    //console.log('hello')
    var scope = 'user-read-private user-read-email,playlist-read-private';
    res.redirect('https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
    }));

})

app.get('/authCallback', async(req, res) => {
    //console.log(req.query.code)

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
        //console.log(body)
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
        res.redirect('http://spotifygrabber.mooo.com:4200/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
        }));
    })
})

app.get('/playlists', async(req, res) => {
  //console.log(req.headers)

  let token = req.headers.authorization.split(' ')[1]

  let response = await fetch('http://api.spotify.com/v1/users/sammy404/playlists', {
    method: 'GET',
    headers: {
      'ContentType' : 'application/json',
      'Authorization' : 'Bearer ' + token
    }
   })

   response = await response.json();
   //console.log(response)
   res.json({playlists: response.items})

})

app.get('/tracks', async(req, res) => {
  let token = req.headers.authorization.split(' ')[1];
  let link = req.headers.link;
  let total = req.headers.total;

  // console.log(link);
  // console.log(total)

  let items = [];
  let tracksNeeded = total;
  let offset = 0;
  while(tracksNeeded>0){
    let response = await fetch(link+'?offset='+offset, {
    method: 'GET',
    headers: 
      {
        'ContentType' : 'application/json',
        'Authorization' : 'Bearer ' + token,
      }
    })
    response = await response.json();
    response.items.forEach(track => {
      items.push(track)
    });
    //console.log(response)
    tracksNeeded -= 100;
    offset += 100;
  }

  res.json({tracks: items});
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))