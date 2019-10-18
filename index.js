// Copyright Samuel I. Olugbemi 2019. All Rights Reserved.
// Node module: node-reverse-proxy
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

const Url = require('url');
const http = require('http');
const HttpProxyAgent = require('http-proxy-agent');
const Request = require('request');

// HTTP/HTTPS proxy to connect to
const proxy = process.env.PROXY_SERVER_URL

// HTTP endpoint for the proxy to connect to
const endpoint = process.env.UPSTREAM_SERVER_BASE_URL

const request = Request.defaults({
  proxy: proxy,
  rejectUnauthorized: false
})

const restriction = process.env.RESTRICTED_TO

RequestProcessor = function (req, resp) {
  const originatingIp = req.connection.remoteAddress
  req.headers['X-Forwarded-For'] = originatingIp
  console.log(`Processing request for client: ${JSON.stringify(originatingIp)}`)

  if (_isForward(req)) {
    ForwardRequest(req, resp)
  } else {
    resp.end('ok')
  }
}

function ForwardRequest(originRequest, originResponse) {
  const url = `${endpoint}${originRequest.url}`
  originRequest.pipe(request({
    url: url
  }).on('response', function (res) {
    console.log('"response" event!', res.headers);
    res.pipe(originResponse);
  }));
}

function _isForward(request) {
  return (!restriction || request.url.includes(restriction)) && request.url !== '/'
}

const port = process.env.PORT || 9000

http.createServer(RequestProcessor).listen(port, () => {
  console.log("Waiting for requests...", `Listening on PORT: ${port}`);
})