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

app.get('/', (req, res) => {
    res.json('what ?')
})

const port = process.env.PORT || 8080
console.log(`app listening to http://0.0.0.0:${port}`)
app.listen(port, "0.0.0.0")