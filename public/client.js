let ws;

function    connectWebSockect() {
    //1. Create a instanse
    ws = new WebSocket('wss://luba-nodejs-prod.onrender.com')
};

connectWebSockect();

ws.onopen = () => {
    ws.send('Hi');
};

ws.onmessage = (event) => {

    const chat = document.getElementById("chat");
    const message = document.createElement("div");
    const reader =  new FileReader();

    reader.onload = () =>{
        //console.log(reader.result);
        message.textContent = reader.result;
        chat.appendChild(message);
    };

    if (event.data instanceof Blob)
    {
        reader.readAsText(event.data);
    }
};

ws.onclose = () => {

};

function   sendMessage ()
{
    if (ws.readyState == WebSocket.OPEN)
    {
        const input = document.getElementById("message");
        ws.send(input.value);
        // Clear the input text
        input.value = '';
    }
}

