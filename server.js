require('dotenv').config()
const express = require('express')
const {join } = require('path')

const app = express()

app.use(express.static(join(__dirname, 'client','build' )))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(require('./routes'))

require('./config')
.then(() => app.listen(3001))
.catch(e => console.error(e))