// This block of code will allow connection to port 3000

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => console.log('Webhook server is listening, port 3000'));

// the following code is to set up the connection to Facebook Messenger as well as Dialogflow

const verificationController = require('./controllers/verification');
app.get('/', verificationController);


const messageWebhookController = require('./controllers/messageWebhook');
app.post('/', messageWebhookController);  

