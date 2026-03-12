const express = require('express');
const { Resend } = require('resend');
const path = require('path');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post('/submit-audit', async (req, res) => {
    const { name, email, company, bottleneck } = req.body;

    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev', // We can update this to your domain later
            to: 'andyknox@saasguidesolutions.com',
            subject: `New GTM Audit Request: ${company}`,
            html: `
                <h2>New Lead Received</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Company:</strong> ${company}</p>
                <p><strong>Bottleneck:</strong> ${bottleneck}</p>
            `
        });

        res.send(`
            <div style="font-family: sans-serif; text-align: center; padding: 50px;">
                <h1>Submission Received!</h1>
                <p>Thanks ${name}, I'll be in touch shortly.</p>
                <a href="/">Back to Home</a>
            </div>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error sending email. Please contact Andy directly.");
    }
});

app.listen(PORT, () => console.log(`Server active on port ${PORT}`));
