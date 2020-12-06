const http = require('http')

http.createServer((request, response) => {
    let body = []
    request.on('error', (err) => {
        console.error(err)
    }).on('data', (chunk) => {
        body.push(chunk.toString())
    }).on('end', () => {
        // body = Buffer.concat(body).toString()
        console.log("body:", body)
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end(`<html lang="en"><head><style>#myid {width: 100px;height: 100px;background-color: #ff5000;}</style></head><body><div>123</div></body></html>`)
    })
}).listen(8088)

console.log('server started')