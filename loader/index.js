// TODO: Switch this to an express app that can be deployed instead of just run locally

const fetch = require('cross-fetch')

const baseUrl = 'https://loadtest-3.alandeploy.com'

const testPatterns = [
  // First field is # of milliseconds the server should burn
  // Second field is # of concurrent requests to run
  // Third field is # of seconds to run this particular test pattern
  [100, 1, 60],
  [100, 2, 60],
  [100, 3, 60],
  [100, 4, 60],
  [100, 5, 60],
  [100, 6, 60],
  [100, 7, 60],
  [100, 8, 60],
  [100, 9, 360],
  [100, 10, 60],
  [100, 12, 60],
  [100, 14, 60],
  [100, 16, 60],
  [100, 18, 360],
  [100, 20, 60],
  [100, 24, 60],
  [100, 28, 360],
  [100, 30, 60],
  [100, 38, 360],
]

const main = async () => {
  for (const pattern of testPatterns) {
    const [ms, concurrency, totalTime] = pattern
    console.log(`Running load test at ${ms}ms CPU load per request, ${concurrency} concurrent requests, for ${totalTime} seconds`)
    const start = Date.now()
    const end = start + (totalTime * 1000)
    let numRequests = 0
    await Promise.all([...new Array(concurrency)].map(async () => {
      while (end > Date.now()) {
        await (await fetch(`${baseUrl}/${ms}`))
        numRequests++
      }
    }))
    console.log(`Finished. Actual time ${(Date.now() - start) / 1000} seconds, Total requests run: ${numRequests}, expected ${totalTime * concurrency * 1000 / ms}`)
  }
}

main()