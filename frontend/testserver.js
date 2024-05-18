const config = require('config');
const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');
const name = config.get('name');
const port = config.get('port');
const defaultLandingPage = 'index.html';

/**
 * Create Server
 */
const testServer = http.createServer((req, res) => {
    const getContentType = (extname = '') => {
        let contentType = 'text/plain';
        if (extname === '.html') return contentType = 'text/html';
        if (extname === '.css') return contentType = 'text/css';
        if (extname === '.js') return contentType = 'text/javascript';
        if (extname === '.svg') return contentType = 'image/svg+xml';
        return contentType;
    }
    const writeResponse = (statusCode = 0, content = {}, output = null, message = '') => {
        res.writeHead(statusCode, content);
        console.log(message);
        res.end(output);
    }
    const filePath = path.join(__dirname, req.url === '/' ? defaultLandingPage : req.url);
    const extname = path.extname(filePath);
    let contentType = getContentType(extname);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            err.code === 'ENOENT' ? writeResponse(404, { 'Content-Type': 'text/plain'}, 'File Not Found', `Failed to open ${filePath}`) : writeResponse(500, { 'Content-Type': 'text/plain'}, 'Internal Server Error', `Failed to open ${filePath}`);
            return
        }
        writeResponse(200, { 'Content-Type': contentType }, data, `Successfully open ${filePath}`);
    });
});

testServer.listen(port, () => console.log(`Starting ${name}. Listening on port: ${port}`));