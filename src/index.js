import Postgress from './db/index.js'
import express from 'express';

const port = 8080

global.postgress = await Postgress.connect();

const app = express()
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
