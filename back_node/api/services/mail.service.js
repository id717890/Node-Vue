const mailer = require('nodemailer')
const logger = require('../logger')
const hbs = require('nodemailer-express-handlebars')
const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jusupovz@gmail.com',
    pass: 'pewzakgaluagcrtz'
  }
})
const hbsOptions = {
  viewEngine: {
    partialsDir: 'api/templates/email/',
    layoutsDir: 'api/templates/email/',
    defaultLayout : 'register',
    extName: '.handlebars'
  },
  viewPath: 'api/templates/email/',
  extName: '.handlebars'
}


const mailService = () => {
  const send = (email, token) => {
    transporter.use('compile', hbs(hbsOptions))
    const url = process.env.APP_FRONT_URL + '/verify?token='+token
    // Step 3
    //eslint-disable-next-line
    let mailOptions = {
      from: 'NODE.JS <jusupovz@gmail.com>', // TODO: email sender
      to: email, // TODO: email receiver
      subject: 'Nodemailer - Test',
      text: 'Wooohooo it works!!',
      template : 'register',
      context: {
        url: url
      } // send extra values to template
    }

    // Step 4
    //eslint-disable-next-line
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        logger.error(err)
      }
      else {
        logger.info('EMAIL SENT')
      }
    })

  }

  return {
    send
  }

}

module.exports = mailService