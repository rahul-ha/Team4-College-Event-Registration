const nodemailer=require('nodemailer');
const t=nodemailer.createTransport({
 host:process.env.SMTP_HOST,
 port:process.env.SMTP_PORT,
 auth:{user:process.env.SMTP_USER, pass:process.env.SMTP_PASS}
});
async function sendTicketEmail(to,sub,html){
 await t.sendMail({from:process.env.FROM_EMAIL,to,subject:sub,html});
}
module.exports={sendTicketEmail};
