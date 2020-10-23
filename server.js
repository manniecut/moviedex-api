
const express = require('express');
const morgan = require('morgan');

const app = express()

app.use(morgan('dev'))

const validGenres = [`Animation`, `Action`, `Adventre`,
                        `Biography`, `Comedy`, `Crime`,
                        `Documentary`, `Drama`, `Fantasy`,
                        `Grotesque`, `History`, `Horror`,
                        `Musical`, `Romantic`, `Spy`,
                        `Thriller`, `War`, `Western`]

function handleGetGenres(req, res) {
    res.json(validGenres)

}

app.get('/genres', handleGetGenres)

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server is listenin' at http://localhost:${PORT}`)
})