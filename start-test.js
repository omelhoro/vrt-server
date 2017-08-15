require('shelljs/global');

var IncomingWebhook = require('@slack/client').IncomingWebhook;
var secret = require('./vault/secret/credentials.js');

var webhook = new IncomingWebhook(secret.slack.webhookUrl);


var version = exec('casperjs test ./testsuite.js --no-colors', {silent: false});

const lines = version.stdout.split('\n');
const jsonString = lines.find(l => l.startsWith('JSON: ')).replace('JSON: ', '');
const json = JSON.parse(jsonString);

console.log("Received JSON: ", jsonString);

function transformTestOutput(json) {
  const text = json.map(e => `• ${e.success ? 'SUCCESS' : '*FAIL*'}: ${e.failFile || e.filename}`).join('\n');
  return text;
}

const text = transformTestOutput(json);

webhook.send(text, function(err, header, statusCode, body) {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('Received', statusCode, body, 'from Slack');
  }

});
