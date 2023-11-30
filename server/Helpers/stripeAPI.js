require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { updateUserDetails } = require('../controllers/UserController');

async function createCustomer(userID, name, email, phone) {
  try {
    const customer = await stripe.customers.create({
      name: name,
      email: email,
      phone: phone,
      metadata: {
        userID: userID,
      },
    });
    // save the customer id in the database
    const customerID = customer.id;
    const result = await updateUserDetails(userID, {stripe_customer_id: customerID});
    if (result) {
      console.log('Customer created successfully in the stripe API');
      return customerID;
    }
    return null;
  } catch (err) {
    console.error('Error occured while creating the customer: ', err.message);
    throw err;
  }
}
async function getCustomer(customerID) {
    try {
        const customer = await stripe.customers.retrieve(customerID);
        return customer;
    } catch (err) {
        console.error('Error occured while getting the customer: ', err.message);
        throw err;
    }
}
async function createPaymentMethod(userID, paymentType, paymentToken, billingDetails, customerID = '') { 
    try {
        const paymentInfo = {
            type: paymentType,
            billing_details: billingDetails,
            metadata: {
                userID: userID,
            },
        };
        if (paymentType == 'card') {
            paymentInfo.card = { token: paymentToken };
        }
        const paymentMethod = await stripe.paymentMethods.create(paymentInfo);
        if (customerID) {
            await stripe.paymentMethods.attach(paymentMethod.id, { customer: customerID });
        }
        return paymentMethod;
    } catch (err) {
        console.error('Error occured while creating the payment method: ', err.message);
        throw err;
    }
}
const format_prices = {
                'SD':'price_1OF75gA475w0fpJu0MjJFDos',
                'XD': 'price_1OF74uA475w0fpJunNNYIGyH',
                '3D': 'price_1OEkrsA475w0fpJumkydRs0T',
                '4DX': 'price_1OF739A475w0fpJuu6YLTXIl',
            };
async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const ticket = req.body.ticket_details;
            
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        price: format_prices[ticket.format],
                        quantity: ticket.quantity,
                    },
                    {
                        price: 'price_1OElaUA475w0fpJunbITKKhP',
                        quantity: 1,
                    }
                ],
                mode: 'payment',
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
                automatic_tax: { enabled: true },
            });
            console.log(session);
            res.redirect(303, session.url);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}

module.exports = { handler, createCustomer, createPaymentMethod,getCustomer};
