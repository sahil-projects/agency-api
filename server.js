require('dotenv').config({ path: './src/.env' })
const http = require ('http')
const express = require('express')
const bodyParser = require('body-parser')
let hostname = 'localhost'
let passport = require('passport');
let port = 3600
let app = express()
let cors = require('cors')
let moongoose = require('mongoose')
let {router} = require('./src/router')
let {jwt} = require('./passport-config')
const server = http.createServer(app)
moongoose.connect(process.env.MONGO_DATABASE)

app.use(cors())
app.use(bodyParser.json())
app.use('/api',router)
app.use(passport.initialize())
passport.use('jwt',jwt)
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
app.use("*", (req, res) => {
    res.sendStatus(400);
  })