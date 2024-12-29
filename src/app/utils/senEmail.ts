import nodemailer from 'nodemailer'

export const sendEmail = async (to: string, html: string) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: "mahadi@mehejarstudio.com",
            pass: "spgu dlgb swze mzte",
        },
    });

    await transporter.sendMail({
        from: 'mahadi@mehejarstudio.com', // sender address
        to, // list of receivers
        subject: "Reset Your Password within 10min", // Subject line
        text: "Hello ki khobor password vule geco", // plain text body
        html // html body
    });
}