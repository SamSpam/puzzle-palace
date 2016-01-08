const dotenv = require ('dotenv')
dotenv.load()

const io = require('socket.io')()

var Flickr = require('flickr').Flickr;

var client = new Flickr(process.env.FLICKR_CONSUMER_KEY, process.env.CONSUMER_SECRET,
                        {"oauth_token": 'optional oauth token', "oauth_token_secret": 'optional oauth token secret'});

const search = function(term){
  this.text = term
  this.media = "photos"
  this.per_page = 1
  this.page = 1
  this.extras = "url_q, url_z, url_b, owner_name"
}

const flickr_params = new search('dog')

client.executeAPIRequest("flickr.photos.search", flickr_params, false, function(err, result) {
// Show the error if we got one
if(err) {
   console.log("FLICKR ERROR: " + err);

   return;
}

// Do something with flicker photos
console.log(result.photos)
})
