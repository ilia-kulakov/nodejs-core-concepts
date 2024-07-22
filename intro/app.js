const http = require('node:http');
const fs = require('node:fs');

const server = http.createServer();

server.on('request', (requset, response) => {
    const result = fs.readFileSync('./text.txt');

    response.setHeader('Content-Type', 'text/plain');
    response.end(result);
});

server.listen(8080, '127.0.0.1', () => {
    console.log('Server has started on:', server.address());
});
