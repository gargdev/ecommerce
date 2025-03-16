const { sendEmail } = require('../services/emailService');

/**
 * Handles sending email from API request
 */
const sendEmailController = async (req, res) => {
    const { to, subject, text, html } = req.body;

    // Validate request
    if (!to || !subject || !text) {
        return res.status(400).json({ error: 'Missing required fields: to, subject, text' });
    }

    // Send email
    const response = await sendEmail(to, subject, text, html);
    if (response.success) {
        return res.status(200).json({ message: response.message });
    } else {
        return res.status(500).json({ error: response.error });
    }
};

module.exports = { sendEmailController };
