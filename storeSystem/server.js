const http = require("http");
const fs = require("fs");

const host = 'localhost';
const port = 4213;

const requestListener = function (req, res) {
    if (req.url === "/auth") {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        console.log(req.url);
        console.log(req.method);
        console.log(req);
        res.end(`{"message": ""}`);
    } else if (req.url === "/setPositionCam") {
        res.writeHead(200);
        fs.readFile("db/camPosition.json", (err, data) =>{
            if (err) throw err;
            console.log(data.toString())
        })
        fs.writeFileSync("db/camPosition.json", JSON.stringify({value: "TEST VALUE"}))
        res.end(`{"message": ""}`);
    } else {
        res.writeHead(404);
        res.end(`{"message": "NOT CORRECTED URL"}`);
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
    console.clear();
    console.log(`ПРИЛОЖЕНИЕ ЗАПУЩЕНО!
НЕ ОБРАЩАЙТЕ ВНИМАНИЕ НА КОНСОЛЬКУ`);
});
