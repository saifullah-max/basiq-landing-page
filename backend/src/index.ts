import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const { EMAIL_USER, EMAIL_PASS, RECEIVER_EMAIL, PORT = 5000 } = process.env;

// Check env variables
if (!EMAIL_USER || !EMAIL_PASS || !RECEIVER_EMAIL) {
    console.error('ERROR: Missing EMAIL_USER, EMAIL_PASS, or RECEIVER_EMAIL in .env!');
    process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

interface AuditRequest {
    name: string;
    email: string;
    message: string;
}

app.post('/api/contact', async (req: Request<{}, {}, AuditRequest>, res: Response) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
        return res.status(400).json({ status: 'error', message: 'Missing required fields' });

    try {
        const info = await transporter.sendMail({
            from: `"Audit Request" <${EMAIL_USER}>`,
            to: RECEIVER_EMAIL,
            subject: `NEW AUDIT REQUEST: ${name} from ${email}`,
            html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
        });
        console.log('Email sent:', info.messageId);
        res.status(200).json({ status: 'ok', message: 'Audit request sent successfully!' });
    } catch (err: any) {
        console.error('Email sending error:', err.message || err);
        res.status(500).json({ status: 'error', message: 'Failed to send email.' });
    }
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

const port = parseInt(PORT as string) || 5000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
    console.log(`API endpoint: /api/contact`);
});