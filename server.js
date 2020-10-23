require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const MOVIES = require('./movies.json');

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

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



/****************** GET HANDLING ***************************/

app.get('/movie', function handleGetMovies(req, res) {
    let response = MOVIES;
    if (req.query.genre) {
        response = response.filter(movie =>
            movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
        )
    }

    if (req.query.country) {
        response = response.filter(movie =>
            movie.country.toLowerCase().includes(req.query.country.toLowerCase())
        )
    }

    /*if(req.query.avg_vote) {
        response = response.filter(movie =>
            movie.avg_vote.toLowerCase().includes(req.query.genre.toLowerCase())
        )
    }*/

    res.json(response)
})


app.get('/genres', function handleGetGenres(req, res) {
    res.json(validGenres)
})



/******************* SERVER *****************************/

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server is listenin' at http://localhost:${PORT}`)
})