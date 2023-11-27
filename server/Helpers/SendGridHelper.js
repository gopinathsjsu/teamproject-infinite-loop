const sgMail = require('@sendgrid/mail')
require('dotenv').config();
api_key = process.env.SENDGRID_API_KEY;
const hello = "Welcome Sravan!! Explore"
// const msg = {
//     to: 'sravangorati2001@gmail.com', // Change to your recipient
//     from: 'boxoffice3108@gmail.com', // Change to your verified sender
//     subject: 'Welcome to BoxOffice',
//     text: 'Here is your membership details',
//     html: `<strong>${hello}</strong>`,
// }
// sgMail
//     .send(msg)
//     .then((data) => {
//         console.log(data)
//     })
//     .catch((error) => {
//         console.error(error)
//     })
exports.SendEmailSendgrid = (req, res, data) => {
    const msg = {
        to: 'mahendrachittupolu@gmail.com', // Change to your recipient
        from: 'boxoffice3108@gmail.com', // Change to your verified sender
        subject: 'Welcome to BoxOffice',
        text: 'Here is your membership details',
        html: `<strong>${hello}</strong>`,
    }
}

exports.sendSignUpEmail = (data) => {
    const { email, name } = data;
    console.log(api_key);
    sgMail.setApiKey(api_key)
    const msg = {
        to: email,
        from: 'boxoffice3108@gmail.com', // Replace with your email address
        subject: 'Welcome to Our Box Office',
        templateId: 'd-62c8184216d444c99ec8cea55421638d', // Replace with your SendGrid template ID
        dynamic_template_data: {
            subject: 'Welcome to Box-Office',
            name: name,
            // Add any other dynamic data you want to include in the email
        },
    };

    sgMail.send(msg)
        .then(() => {
            console.log('Signup email sent successfully');
        })
        .catch((error) => {
            console.error('Error sending signup email:', error);
        });
}