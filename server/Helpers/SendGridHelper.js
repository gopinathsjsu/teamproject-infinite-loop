const sgMail = require('@sendgrid/mail')
require('dotenv').config();
api_key = process.env.SENDGRID_API_KEY;

exports.sendSignUpEmail = async (data) => {
    const { email, name } = data;
    //console.log(api_key);
    sgMail.setApiKey("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")
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

    await sgMail.send(msg)
        .then(() => {
            console.log('Signup email sent successfully');
        })
        .catch((error) => {
            console.error('Error sending signup email:', error);
        });
}

exports.sendTicketEmail = async (data) => {
    const { email, name, movieName, showTime, seatNos, theaterName, qrlink, screenName, date } = data;
  //  console.log(api_key);
    sgMail.setApiKey("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")
    const msg = {
        to: email,
        from: 'boxoffice3108@gmail.com', // Replace with your email address
        subject: 'Welcome to Our Box Office',
        templateId: 'd-1f710be314004ace93e3ca27cfd348aa', // Replace with your SendGrid template ID
        dynamic_template_data: {
            subject: 'Hey...CinePhile here is your ticket',
            name: name,
            movieName: movieName,
            showTime: showTime,
            seatNos: seatNos,
            theaterName: theaterName,
            qrlink: qrlink,
            screenName: screenName,
            date: date,
            // Add any other dynamic data you want to include in the email
        },
    };

    await sgMail.send(msg)
        .then(() => {
            console.log('Ticket email sent successfully');
        })
        .catch((error) => {
            console.log('Error sending signup email:', error);
        });
}