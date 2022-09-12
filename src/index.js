import postgress from './db/index.js'
import express from 'express';

const port = 8080

global.postgress = await postgress.connect();

const app = express()
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
