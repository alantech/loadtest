const express = require('express')
const { ds, }= require('./anycloud-lib') // TODO: Once published, use that version instead

const app = express()

app.use(express.json({ limit: '10MB' }))

app.get('/:ms', (req, res) => {
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
  res.send(await ds[req.params.key])
})

app.post('/kv/:key', (req, res) => {
  res.send(ds[req.params.key] = req.body)
})

// Some built-in keys to check on
ds.foo = 'bar'
ds.helloWorld = 'Hello, World!'

app.listen(8088)