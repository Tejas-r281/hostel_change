// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");

/*
const sendEmail = async (data) => {
  // console.log(email, subject, text);
  // create reusable transporter object using the default SMTP transport
  // const transporter = nodeMailer.createTransport({
  //   host: process.env.SMPT_HOST,
  //   port: process.env.SMPT_PORT,
  //   service: process.env.SMPT_SERVICE,
  //   auth: {
  //     user: process.env.SMPT_MAIL,
  //     pass: process.env.SMPT_PASSWORD,
  //   },
  // });
  const OAuth2 = google.auth.OAuth2;

  // username = process.env.USER;
   const client_id = process.env.CLIENT_ID;
   const client_secret = process.env.CLIENT_SECRET;
   const refresh_token = process.env.REFRESH_TOKEN;
   const redirect_uri=process.env.REDIRECT_URI;
   const user= process.env.SMPT_MAIL;

//  console.log(client_id,client_secret,refresh_token,redirect_uri,user);
  // console.log(username);

  const oauth2Client = new OAuth2(
    client_id,
    client_secret,
    redirect_uri
  );

  oauth2Client.setCredentials({
    refresh_token: refresh_token,
  });

  const accessToken =await oauth2Client.getAccessToken();
  // console.log(accessToken);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: user,
      clientId: client_id,
      clientSecret: client_secret,
      refreshToken: refresh_token,
      accessToken: accessToken,
    },
  });
//  console.log('text is printing here');
  // console.log(data.email,data.message,data.subject);

  const mailOptions = {
    from: "This is for resetting your password 😂 <raushan.043.kumar@gmail.com>",
    to: data.email,
    subject: data.subject,
    text: data.message,
  };

  const result= await transporter.sendMail(mailOptions);

  // console.log(result);
};

module.exports = sendEmail;
*/
const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    secureConnection: false,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
    tls: {
      rejectUnAuthorized: true,
    },
  });
  // console.log(options);
  // const mailOptions = {
  //   from: "<raushan.043.kumar@gmail.com>",
  //   to: options.email,
  //   subject: options.subject,
  //   text: options.message,
  // };

  await transporter.sendMail(options);
};

module.exports = sendEmail;
