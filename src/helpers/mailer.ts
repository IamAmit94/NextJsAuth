import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        // const hashedToken = await bcryptjs.hash(userId.toString(), process.env.SALT_LENGTH || 10)
        

        if (emailType === "VERIFY") {
            // if user is verified we will find and update the user verifyToken and verifyTokenExpiry
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000}) // token is valid for 1hour
                // {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + process.env.TOKEN_TIME || 3600000})
        } else if (emailType === "RESET"){
            // if user reset the password then we will find and update the user forgotPasswordToken and forgotPasswordTokenExpiry
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        let verifyEmail = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> here</a> to 
            ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser.
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`


        // let forgotPassEmail = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> here</a> to 
        //     ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        //     or copy and paste the link below in your browser.
        //     <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        //     </p>`  
          
        console.log('process.env.USER_PASSWORD====',process.env.USER_PASSWORD)
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.USER_MAILTRAP,
              pass: process.env.USER_PASSWORD
              
            }
          });


        const mailOptions = {
            from: 'amit@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: verifyEmail
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}