const express = require('express')
const bodyParser = require('body-parser')
const ngrok = require('ngrok')
const decodeJWT = require('did-jwt').decodeJWT
const { Credentials } = require('uport-credentials')
const transports = require('uport-transports').transport
const message = require('uport-transports').message.util

let endpoint = ''
const app = express();
app.use(bodyParser.json({ type: '*/*' }))

//setup Credentials object with newly created application identity.
const credentials = new Credentials({
  appName: 'Login Example',
  did: 'did:ethr:0x0a625772589d20ff9d3907f56cd07bc96284151a',
  privateKey: '633150a6e32727ec46c2449015c95bc66ebe4bbd112aa5fb232e3d4b0d06b860'
});

app.get('/', (req, res) => {
  credentials.createDisclosureRequest({
    verified: ['Name'],
    callbackUrl: endpoint + '/callback'
  }).then(requestToken => {
    console.log(decodeJWT(requestToken))  //log request token to console
    const uri = message.paramsToQueryString(message.messageToURI(requestToken), {callback_type: 'post'})
    const qr =  transports.ui.getImageDataURI(uri)
    res.send(`<div><img src="${qr}"/></div>`)
  })
})

app.post('/callback', (req, res) => {
  const jwt = req.body.access_token
  console.log(jwt)
  console.log(decodeJWT(jwt))
  credentials.authenticateDisclosureResponse(jwt).then(creds => {
    //validate specific data per use case
    console.log('creds returned', creds)
    console.log('verfied?', creds.verified)
  }).catch( err => {
    console.log("oops", err)
  })
})

// run the app server and tunneling service
const server = app.listen(8088, () => {
  ngrok.connect(8088).then(ngrokUrl => {
    endpoint = ngrokUrl
    console.log(`Verification Service running, open at ${endpoint}`)
  })
})

