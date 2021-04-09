const express = require('express')

const app = express()

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

app.listen(8088)