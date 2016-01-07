const dotenv = require ('dotenv')
dotenv.load()
const Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: process.env.FLICKR_CONSUMER_KEY,
      secret: process.env.CONSUMER_SECRET
    };

var flickr = new Flickr({
        api_key: process.env.FLICKR_CONSUMER_KEY,
        progress: false
    });
