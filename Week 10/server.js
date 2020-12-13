const http = require('http')
http.createServer((request, response) => {
    let body = []
    request.on('error', (err) => {
        console.error(err)
    }).on('data', (chunk) => {
        //body.push(chunk.toString())
        body.push(Buffer.from(chunk));
    }).on('end', () => {
        body = Buffer.concat(body).toString()
        console.log('body:', body)
        response.writeHead(200, {'Content-type': 'text/html'})
        response.end(`<html maaa=a><head><style>#container {width: 500px;height: 300px;display: flex;background: rgb(255,255,255);}#container #myid {width: 200px;height: 100px;background: rgb(255,0,0);}#container .c1 {flex: 1;background: rgb(0,255,0);}</style></head><body><div id="container"><div id="myid" /><div class="c1" /></div></body></html>`)
    })
}).listen(8088)

console.log('server started')