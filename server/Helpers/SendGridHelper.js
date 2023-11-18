const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")
const hello = "Welcome Sravan!! Explore"
const msg = {
    to: 'sravangorati2001@gmail.com', // Change to your recipient
    from: 'boxoffice3108@gmail.com', // Change to your verified sender
    subject: 'Welcome to BoxOffice',
    text: 'Here is your membership details',
    html: `<strong>${hello}</strong>`,
}
sgMail
    .send(msg)
    .then((data) => {
        console.log(data)
    })
    .catch((error) => {
        console.error(error)
    })

exports.SendEmailSendgrid = (req, res, data) => {

    const msg = {
        to: 'mahendrachittupolu@gmail.com', // Change to your recipient
        from: 'boxoffice3108@gmail.com', // Change to your verified sender
        subject: 'Welcome to BoxOffice',
        text: 'Here is your membership details',
        html: `<strong>${hello}</strong>`,
    }

}