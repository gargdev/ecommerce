// const sgMail = require('@sendgrid/mail');
// require('dotenv').config();

// // Set SendGrid API Key
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// /**
//  * Sends an email using SendGrid
//  * @param {string} to - Recipient email address
//  * @param {string} subject - Email subject
//  * @param {string} text - Plain text email body
//  * @param {string} html - HTML email body (optional)
//  */
// const sendEmail = async (to, subject, text, html = '') => {
//     try {
//         const msg = {
//             to, // Recipient email
//             from: process.env.SENDER_EMAIL, // Verified sender email in SendGrid
//             //from:"offcyuvi2482@gmail.com",
//             subject,
//             text,
//             html, // Optional HTML content
//         };

//         await sgMail.send(msg);
//         console.log(`Email successfully sent to ${to}`);
//         return { success: true, message: `Email sent to ${to}` };
//     } catch (error) {
//         console.error('Error sending email:', error.response?.body || error.message);
//         return { success: false, error: error.response?.body || error.message };
//     }
// };

// module.exports = { sendEmail };


const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text, html) => {
  try {
    const msg = {
      to,
      from: process.env.SENDER_EMAIL, // Must be a verified sender in SendGrid
      subject,
      text,
      html,
    };

    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error.response ? error.response.body : error);
  }
};

module.exports = { sendEmail };
