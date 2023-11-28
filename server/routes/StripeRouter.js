// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_51OEgQqA475w0fpJu0UGqIEWrDuGSMhXRk5T6mUW3TWhuk4Pb4sZabO9NX43bPlBOcMFeRmuFgL9YGTk7eiDxfJqx00TcD0eQvw');

// Using Express
const app = require('express')();

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');

app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  const payload = request.body;

  console.log("Got payload: " + payload);

  response.status(200).end();
});

app.listen(4242, () => console.log('Running on port 4242'));