const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use('/public', express.static(__dirname + '/public'))


app.get('/', async (req, res) => {
  res.render('index')
})

app.get('/qr', async (req, res) => {
  res.render('qr')
})

app.get('/check', async (req, res) => {
  res.json({
    result: 'ok',
  })
})

app.listen(process.env.API_PORT || 80)