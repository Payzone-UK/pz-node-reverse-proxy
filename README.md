[![Build Status](https://travis-ci.com/Payzone-UK/pz-node-reverse-proxy.svg?branch=master)](https://travis-ci.com/Payzone-UK/pz-node-reverse-proxy)

# Nodejs Reverse Proxy/Tunneling on Heroku

A reverse proxy for serving requests to servers located in a restricted network connectivity including firewalls, NATs and ACLs, among other restrictions. The tunnel is created by an intermediary called a proxy server which is usually located in a DMZ.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Installation

Use the [Deploy to Heroku](https://heroku.com/deploy) button above to create a copy of the app.

## Configuration

The app needs the following environment variables:

* PROXY_SERVER_URL: URL of HTTP/HTTPS proxy used to for Tunneling e.g. http://abc:xyz@example.com:80 (required)
* UPSTREAM_SERVER_BASE_URL: The upstream server to which all requests should be proxied e.g https://api-example.com (required)
* RESTRICTED_TO: This is useful for restricting the Reverse Proxying to a URL that contains specific keyword e.g. `/api/` (ONLY URL with /api/ will be proxied). All request endpoints will be proxied if nothing is specified. (optional)