// Copyright Samuel I. Olugbemi 2019. All Rights Reserved.
// Node module: node-reverse-proxy
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

if (process.env.NEW_RELIC_LICENSE_KEY) {
  require('newrelic');
}
const app = require('./setup.js');

const port = process.env.PORT || 9000

app.server.listen(port, () => {
  console.log("Waiting for requests...", `Listening on PORT: ${port}`);
})