require('dotenv').config()
const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')

const app = express()


app.use(helmet())
app.use(bodyParser.json())
app.use(cookieParser({
    secret: ['cat', 'black-cat', 'keyboard-cat'],
}))

const openai_token = process.env.OPENAI_TOKEN || ""

app.all('*', (req, res) => {
    const {
        method,
        originalUrl: originalUrl,
        body: data
    } = req
    const url = `https://api.openai.com${originalUrl}`
    axios({ method, url, data, headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openai_token}`,
    }}).then(response => {
        res.status(response.statusCode).json(response.data)
    }).catch(err => {
        res.json(err)
    })
})

const port = process.env.PORT || 8080
console.log(`app listening to http://0.0.0.0:${port}`)
app.listen(port, "0.0.0.0")