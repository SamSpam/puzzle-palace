var websocket = require('websocket-stream')
var stream = require('readable-stream')

var ws = websocket('ws://localhost:5001')

ws.pipe(new stream.Transform({
  transform: function (chunk, encoding, callback) {
    console.log("chunk", chunk.toString())
    callback()
  }
}))
