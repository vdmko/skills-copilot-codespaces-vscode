// Create web server
// Listen on port 3000
// Parse request body
// Load comments from file
// Add new comment to comments
// Save comments to file
// Respond with comments
// Respond with error
// Respond with 404

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const COMMENTS_FILE = path.join(__dirname, 'comments.json');
const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/comments') {
    fs.readFile(COMMENTS_FILE, (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Server error');
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.end(data);
      }
    });
  } else if (req.method === 'POST' && req.url === '/comments') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      fs.readFile(COMMENTS_FILE, (err, data) => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end('Server error');
        } else {
          let comments = JSON.parse(data);
          comments.push(JSON.parse(body));
          fs.writeFile(COMMENTS_FILE, JSON.stringify(comments), err => {
            if (err) {
              console.error(err);
              res.statusCode = 500;
              res.end('Server error');
            } else {
              res.end(body);
            }
          });
        }
      });
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

// Run the server with node comments.js
// Open Postman
// Send a POST request to http://localhost:3000/comments with a JSON body
// Send a GET request to http://localhost:3000/comments
// Send a DELETE request to http://localhost:3000/comments
// Send a GET request to http://localhost:3000/anything
// Send a POST request to http://localhost:3000/anything
// Send a DELETE request to http://localhost:3000/anything