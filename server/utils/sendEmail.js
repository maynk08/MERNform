const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
	//	let testAccount = await nodemailer.createTestAccount();
		const transporter = nodemailer.createTransport({
			service:'gmail',
			host: 'smtp',
			port: 587,
			auth: {
				user: '', //email
				pass: '' //password
			}
		});
          // console.log(testAccount.user,testAccount.password,email)
		await transporter.sendMail({
			from:'' ,//name
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};
