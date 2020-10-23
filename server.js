
const express = require('express');
const morgan = require('morgan');

const app = express()

app.use(morgan('dev'))

app.use((req, res) => {
    res.send('lolol')
})

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server is listenin' at http://localhost:${PORT}`)
})