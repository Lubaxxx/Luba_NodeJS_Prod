const WebSocket = require('ws');
const http = require('http');
const path = require('path');
const fs = require('fs');

// -- 1. Create Server
const server = http.createServer((request,response)=>{
    console.log(request.url);

    //3.2. if no 'path' is defined, return 'index.html'
    const url = request.url === '/' ? 'index.html' : request.url;

    console.log(__dirname);
    const filePath = path.join(__dirname, "public", url);
    console.log(`filePath: ${filePath}`);

    const fileExt = path.extname(filePath);

    let contentType;

    switch (fileExt) {
        case '.avi':
            contentType = "video/x-msvideo";
            break;
        case '.csv':
            contentType = "text/csv";
            break;
        case '.doc':
            contentType = "application/msword";
            break;
        case '.ico':
            contentType = "image/vnd.microsoft.icon";
            break;
        case '.css':
            contentType = "text/css";
            break;
        case '.jpg':
            contentType = "image/jpeg";
            break;
        case '.json':
            contentType = "application/json";
            break;
        default:
            contentType = "text/html";
    };

    //3.3. else look for the desired files
    //read file async
    fs.readFile(filePath, (error, content) => {
        // 1. Check for errors, return 404 error
        // 2. If exist, return file

        if (error) {
            if (error.code === 'ENOENT') {
                const errorFile = path.join(__dirname, "public", "404.html");
                fs.readFile(errorFile, (err, data) => {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(data);
                })
            } else {
                response.writeHead(500);
                response.end(`Server error: ${error.code}`);
            }
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf8');
        }

    })
});

// -- 2. Initializa the WS Server
const wss = new WebSocket.Server({ server });

//handling Client Connecction
wss.on('connection',(ws)=>{
    ws.on('message',(message)=>{
        console.log(`Recieved: ${message}`);

        wss.clients.forEach(client => {
            if (client.readyState == WebSocket.OPEN)
            {
                client.send(message);
            }
        })        

    }
    
    )            
    console.log('Client Connected')
})

// -- 3. start the server
const PORT=3006;
server.listen(PORT,()=>{
    console.log('Server is running on port http://localhost:${PORT}');
});