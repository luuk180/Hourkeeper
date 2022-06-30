const express = require('express');
const app = express();
const jwks = require('jwks-rsa');
const {expressjwt} = require("express-jwt");
const cors = require('cors');

const jwtCheck = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-d0-elrpu.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://api.hourkeeper.net',
  issuer: 'https://dev-d0-elrpu.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(cors({
  origin: "*"
}));
app.use(jwtCheck);

app.get('/query', function (req, res) {
  res.send();
});

app.listen(3000);