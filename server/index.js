var http = require('http')
var websocket = require('websocket-stream')
var Transform = require('readable-stream').Transform
const dotenv = require ('dotenv')
dotenv.load()
var Flickr = require('flickr').Flickr;
var split = require('split2')

var httpServer = http.createServer(httpHandler)
var wsServer = websocket.createServer({
  server: httpServer.listen(5001)
}, wsHandler)

function httpHandler (req, res) {
}

var client = new Flickr(process.env.FLICKR_CONSUMER_KEY, process.env.CONSUMER_SECRET,{
  "oauth_token": 'optional oauth token',
  "oauth_token_secret": 'optional oauth token secret'
});

const createParams = function(term){
  return {
    text: term,
    media: "photos",
    per_page: 1,
    page: 1,
    extras: "url_q, url_z, url_b, owner_name"
  }
}

function wsHandler (stream) {
  stream
  .pipe(split())
  .pipe(new Transform({
    transform: function (chunk, encoding, callback) {
      var params = createParams(chunk.toString())
      client.executeAPIRequest("flickr.photos.search", params, false, function(err, result) {
        if(err) {
          console.error("FLICKR ERROR: " + err);
          return callback(err)
        }
        console.log("FLICKR DATA:", result.photos)
        var url = result.photos.photo[0].url_z
        callback(null, url + "\n")
      })
    }
  }))
  .pipe(stream)
}
