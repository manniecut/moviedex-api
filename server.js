require('dotenv').config();
const express = require('express');
const morgan = require('morgan');


console.log(process.env.API_TOKEN)

const app = express()

app.use(morgan('dev'))
app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')
    console.log('validation')
    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    next()
})

const validGenres = [
    `Animation`, `Action`, `Adventre`,
    `Biography`, `Comedy`, `Crime`,
    `Documentary`, `Drama`, `Fantasy`,
    `Grotesque`, `History`, `Horror`,
    `Musical`, `Romantic`, `Spy`,
    `Thriller`, `War`, `Western`
];

function handleGetMovies(req, res) {
    res.send('HEY');
}
app.get('/movie', handleGetMovies)

function handleGetGenres(req, res) {
    res.json(validGenres)
}
app.get('/genres', handleGetGenres)

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server is listenin' at http://localhost:${PORT}`)
})