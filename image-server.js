// A basic bare-bones usage example where node-gallery does all the rendering.
var express = require('express'),
port = 3000;
var app = express();
// In your project, this would be require('node-gallery')
app.use('/gallery', require('node-gallery')({
  staticFiles : 'pictures',
  urlRoot : 'gallery',
  title : 'Visual Regression Testing'
}));

app.listen(port, '0.0.0.0');
console.log('node-gallery listening on localhost:' + port);