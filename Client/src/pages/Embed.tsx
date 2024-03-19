const ENDPOINT = import.meta.env.VITE_API_URL;
let BARE_ENDPOINT = ENDPOINT?.split('//')[1];
if(BARE_ENDPOINT[BARE_ENDPOINT.length - 1] === '/') {
    BARE_ENDPOINT = BARE_ENDPOINT.slice(0, BARE_ENDPOINT.length - 1);
}

export default function Embed() {
    const connection: Connection = new Connection(BARE_ENDPOINT);
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl text-center mt-10">Embed Page</h1>
            <p>Embedded on: <span className="text-blue-500">{document.referrer}</span></p>
            <p>Session ID : {document.cookie}</p>
        </div>
    );
}

class Connection {   
    ws: WebSocket;
    
    constructor(endpoint: string) {
        this.ws = new WebSocket(`ws://${endpoint}`);
        this.ws.onopen = () => {
            console.log('Connected to the server');
        };
        this.ws.onmessage = (msg) => {
            console.log(msg);
        };

    }
    send(data: string) {
        if(this.ws.readyState === this.ws.OPEN) {
            console.log(data);
        } else {
            let tries = 0;
            const interval = setInterval(() => {
                if(this.ws.readyState === this.ws.OPEN) {
                    console.log("Connected to the server");
                    this.ws.send(data);
                    clearInterval(interval);
                } else {
                    tries++;
                    if(tries > 5) {
                        console.log("Failed to connect to the server");
                        clearInterval(interval);
                    }
                    console.log("Waiting for connection");
                }
            }, 1000)
        }
    }

    close() {
        this.ws.close();
    }

}

const ENDPOINT = import.meta.env.VITE_API_URL;
let BARE_ENDPOINT = ENDPOINT?.split('//')[1];
if(BARE_ENDPOINT[BARE_ENDPOINT.length - 1] === '/') {
    BARE_ENDPOINT = BARE_ENDPOINT.slice(0, BARE_ENDPOINT.length - 1);
}

export default function Embed() {
    const connection: Connection = new Connection(BARE_ENDPOINT);    
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl text-center mt-10">Embed Page</h1>
            <p>Embedded on: <span className="text-blue-500">{document.referrer}</span></p>
            <p>Session ID : {document.cookie}</p>
        </div>
    );
}