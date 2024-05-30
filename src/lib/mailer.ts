import nodemailer from 'nodemailer';
import { hash } from 'bcrypt';
import { User } from '@/models/User';

export async function sendEmail({ email, emailType, userId }: SendEmailTypes) {
    try {
        const hashedToken = await hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'ilkinhaciyev955@gmail.com',
              pass: process.env.APP_PASSWORD, 
            },
        });
        
        const mailOptions = await transporter.sendMail({
            from: 'Ilkin Haciyev',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verify-email?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verify-email?token=${hashedToken}
            </p>`   
        });

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;
    } catch (error: any) {
        throw new Error(error);
    }
}
