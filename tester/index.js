const express = require('express')
const { ds, } = require('./anycloud-lib') // TODO: Once published, use that version instead

const app = express()

app.use(express.text())

app.get('/load/:ms', (req, res) => {
  const ms = parseInt(req.params.ms, 10)
  const start = Date.now()
  const end = start + ms
  let j = 0
  while (end > Date.now()) {
    for (let i = 0; i < 1000; i++) {
      j = Math.sin(j + i)
    }
  }
  const requestedTime = ms
  const actualTime = Date.now() - start
  res.send(JSON.stringify({
    requestedTime,
    actualTime,
    j, // Why not?
  }))
})

app.get('/kv/:key', async (req, res) => {
  console.log(ds[req.params.key])
  console.log(await ds[req.params.key])
  res.send(await ds[req.params.key])
})

app.post('/kv/:key', async (req, res) => {
  ds[req.params.key] = req.body;
  const val = await ds[req.params.key];
  res.send(val)
})

app.listen(8088)