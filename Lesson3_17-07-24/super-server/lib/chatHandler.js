const WebSocket = require('ws');
const http = require('http');
const path = require('path');
const fs = require('fs');

const chatHandler = server => {
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
}

module.exports = {chatHandler};