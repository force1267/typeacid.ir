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
const users = (process.env.USER_TOKENS || "").split(',').map(user => user.split('.')).reduce((p, c) => (p[c[0]] = c[1], p), {})

app.use((req, res, next) => {
    const {
        headers,
    } = req
    const auth = headers.authorization
    if(!auth) {
        return res.json({ message: "Authenticate", code: "ACCESS_DENIED", status: 403, data: {} })
    }
    const token = auth.split('.')
    const pass = users[token[0]]
    if(!pass || pass !== token[1]) {
        return res.json({ message: "Authenticate", code: "ACCESS_DENIED", status: 403, data: {} })
    }
    return next()
})
app.all('*', (req, res) => {
    const {
        method,
        originalUrl,
        body: data
    } = req
    const url = `https://api.openai.com${originalUrl}`
    let request = null
    if(method.toLocaleLowerCase() === "get") {
        request = axios.get(url, { headers: {
            'Authorization': `Bearer ${openai_token}`,
        }})
    } else {
        request = axios({ method, url, data, headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openai_token}`,
        }})
    }
    request.then(response => {
        res.status(response.status).json(response.data)
    }).catch(({ message, code, response: { data, status } }) => {
        res.json({ message, code, status, data })
    })
})

const port = process.env.PORT || 8080
console.log(`app listening to http://0.0.0.0:${port}`)
app.listen(port, "0.0.0.0")