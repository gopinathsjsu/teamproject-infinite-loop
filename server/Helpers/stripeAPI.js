require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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

module.exports = handler;
