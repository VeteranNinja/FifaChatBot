const API_AI_TOKEN = 'f05bd0e4ead04868905f6c4fb1da83e4';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAAdR1hCiAE4BAHccyBZAyFlq5AK2bX7I0vgZAa1fe7KGhks7Cmpxz2dw6FLP4Us3TtXzcPVsfWPgMtUKrUPprWSlsSZB6TUwKiZAXzjT9QdE0nINYOiyZC92SyWCeU5QjAdQgQV2Dr369DJdBcxlq2jm9n6tsIlHc4JHVTaTisQZDZD';
const request = require('request');
const sendTextMessage = (senderId, text) => {
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
			qs: { access_token: FACEBOOK_ACCESS_TOKEN },
		method: 'POST',
		json: {
			recipient: { id: senderId },
			message: { text },
		}
 });
};
module.exports = (event) => {
	const senderId = event.sender.id;
	const message = event.message.text;
	const apiaiSession = apiAiClient.textRequest(message, { sessionId: 'NajeebChatBot' });
	apiaiSession.on('response', (response) => {
		const result = response.result.fulfillment.speech;
		sendTextMessage(senderId, result);
	});
	apiaiSession.on('error', error => console.log(error));
	apiaiSession.end();
};