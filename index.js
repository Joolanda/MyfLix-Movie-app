/* const express = require('express'); */
/* const app = express();*/
const http = require('http');
  url = require('url');
  
http.createServer((request, response) => {
  var requestURL = url.parse(request.url, true);
  if ( requestURL.pathname == "/documentation.html") {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Documentation on the book club API.\n');
}   else {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('welcome to my book club!\n');

}

}).listen(8080);

console.log('My first Node test server is running on Port 8080.');
