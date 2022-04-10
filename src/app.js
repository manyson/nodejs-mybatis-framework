// config file 위치 지정 설정
require('dotenv').config(({path : (__dirname + '/config/.env')}));

const express   = require('express');
const app       = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`app listening on port ${process.env.SERVER_PORT}`)
});