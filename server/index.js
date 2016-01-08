var http = require('http')
var websocket = require('websocket-stream')

var httpServer = http.createServer(httpHandler)
var wsServer = websocket.createServer({
  server: httpServer.listen(5001)
}, wsHandler)

function httpHandler (req, res) {

}

function wsHandler (stream) {
  stream.write("yo!\n")
}
