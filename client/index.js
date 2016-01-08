var websocket = require('websocket-stream')
var Transform = require('readable-stream').Transform
var split = require('split2')
var $ = require('jquery')

var stream = websocket('ws://localhost:5001')

stream
.pipe(split())
.pipe(new Transform({
  transform: function (chunk, encoding, callback) {
    console.log("chunk", chunk.toString())
    callback()
  }
}))

// stream.write('dog\n')


$('#searchForm').submit(function(e) {
  e.preventDefault()
  var term = $('#searchTerm').val()
  stream.write(term + '\n')
})
