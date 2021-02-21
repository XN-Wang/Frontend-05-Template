let http = require('http')
let https = require('https')
let unzipper = require('unzipper')
let querystring = require('querystring')

//2.auth路由：接受code，用code+client_id+client_secret换token
function auth(request, response) {
    let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1])
    console.log(query)
    getToken(query.code, function(info) {
        console.log('info', info)
        response.write(`<a href="http://localhost:8083/?token=${info.access_token}">publish</a>`)
        response.end()
    })
}
function getToken(code, callback) {
    let request = https.request({
        hostname: 'github.com',
        path: `/login/oauth/access_token?code=${code}&client_id=Iv1.24408d90171bc9fc&client_secret=680e98a14ee47f239745e791c74c4e2859669db0`,
        post: 443,
        method: 'POST'
    }, function(response) {
        let body = ''
        response.on('data', chunk => {
            body += chunk.toString()
        })
        response.on('end', chunk => {
            callback(querystring.parse(body))
        })
    })
    request.end()
}
//4.publish路由：用token换取用户信息，检查权限，接受发布
function publish(request, response) {
    let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1])
    getUser(query.token, info => {
        if(info.login === 'XN-Wang') {
            request.pipe(unzipper.Extract({ path: '../server/public/'}))
            request.on('end', function() {
                response.end('success!')
            })
        }
    })
}

function getUser(token, callback) {
    let request = https.request({
        hostname: 'api.github.com',
        path: `/user`,
        post: 443,
        method: 'GET',
        headers: {
            Authorization: `token ${token}`,
            'User-Agent': 'wxn-toy-publish'
        }
    }, function(response) {
        let body = ''
        response.on('data', chunk => {
            body += chunk.toString()
        })
        response.on('end', chunk => {
            callback(JSON.parse(body))
        })
    })
    request.end()
}

http.createServer(function(request, response) {
    console.log(request.url)
    if(request.url.match(/^\/auth\?/)) {
        return auth(request, response)
    } else if(request.url.match(/^\/publish\?/)) {
        return publish(request, response)
    }
}).listen(8082)