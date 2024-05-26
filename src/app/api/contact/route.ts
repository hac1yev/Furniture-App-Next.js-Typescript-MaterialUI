import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ilkinhaciyev955@gmail.com',
      pass: process.env.APP_PASSWORD, 
    },
});

export async function POST(req: Request) {
    const { fullName,email,theme,message } = await req.json();

    if (!fullName || !email || !message || !theme) {
        return Response.json({ error: 'All inputs are required!' });
    }

    try {
        await transporter.sendMail({
            from: email,
            to: 'ilkinhaciyev955@gmail.com',
            text: 'This is a test subject',
            subject: "Contact Form Submission",
            html: `
                <h3>Contact Details:</h3>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Theme:</strong> ${theme}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
        });
    } catch (error) {
        return Response.json({ error });
    }

    return Response.json({ message: 'Message Successfully is submitted!' })
};