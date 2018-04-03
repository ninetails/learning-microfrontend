const { existsSync, readFile, realpath } = require('fs')
const { join } = require('path')
const http = require('http')
const connect = require('connect')

const app = connect()

// gzip/deflate outgoing responses
app.use(require('compression')())

// parse urlencoded request bodies into req.body
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// logger
app.use(require('connect-logger')())

// respond to all requests
app.use((req, res) => {
  if (req.pathname === '/favicon.ico') {
    res.statusCode = 404;
    return res.end()
  }

  const path = join(__dirname, req.url.split('?')[0].substring(1))
  if (existsSync(path) && path !== __dirname) {
    return readFile(path, 'utf-8', (err, data) => res.end(data))
  }

  return readFile(join(__dirname, 'index.html'), 'utf-8', (err, data) => res.end(data))
})

//create node.js http server and listen on port
http.createServer(app).listen(3000)
