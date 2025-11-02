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

// Improved CORS configuration
app.use(cors({
  origin: '*', // Allow all origins (or specify: ['https://basiq.netlify.app'])
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

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
    console.log('Received contact request:', { name: req.body.name, email: req.body.email });
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        console.log('Missing required fields');
        return res.status(400).json({ status: 'error', message: 'Missing required fields' });
    }

    try {
        console.log('Attempting to send email...');
        
        // Create a promise with timeout to prevent hanging
        const emailPromise = transporter.sendMail({
            from: `"Audit Request" <${EMAIL_USER}>`,
            to: RECEIVER_EMAIL,
            subject: `NEW AUDIT REQUEST: ${name} from ${email}`,
            html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
        });

        // Add overall timeout for email sending (45 seconds)
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Email sending timeout after 45 seconds')), 45000);
        });

        const info = await Promise.race([emailPromise, timeoutPromise]) as any;
        console.log('Email sent successfully:', info.messageId);
        return res.status(200).json({ status: 'ok', message: 'Audit request sent successfully!' });
    } catch (err: any) {
        console.error('Email sending error - Full error:', err);
        console.error('Email error details:', {
            code: err.code,
            command: err.command,
            response: err.response,
            message: err.message
        });
        
        // Provide more helpful error message
        let errorMessage = 'Failed to send email.';
        if (err.response) {
            errorMessage = `Email service error: ${err.response}`;
        } else if (err.code) {
            errorMessage = `Email error (${err.code}). Please check email configuration.`;
        }
        
        return res.status(500).json({ 
            status: 'error', 
            message: errorMessage 
        });
    }
});

app.get('/health', (req, res) => {
    return res.status(200).json({ status: 'ok', message: 'Server is running' });
});

const port = parseInt(PORT as string) || 5000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
    console.log(`API endpoint: /api/contact`);
});