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

app.post('/query', function (req, res) {
  let authToken = req.auth.sub.split("|")
  switch (authToken[0]) {
    case "google-oauth2":
      console.log("Logging in with google")
      res.status(200)
      res.send({message: "Success!"})
      console.log(req.body.then())
      break;
    case "windowslive":
      console.log("Logging in with microsoft")
      res.status(200)
      res.send({message: "Success!"})
      break;
    default:
      console.log("incorrect")
      res.status(401)
      res.send({message: "failed!"})
  }
  console.log(authToken[1])
});

app.listen(3000);