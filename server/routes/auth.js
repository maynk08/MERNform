const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const BASE_URL = 'http://localhost:3000/'

router.post("/", async (req, res) => {
	try {
		console.log(req.body)
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
	//	console.log(user)
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		//console.log(validPassword)
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		if (!user.verified) {
			let token = await Token.findOne({ userId: user._id });
			if (!token) {
				token = await new Token({
					userId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
				}).save();
				const url = `${BASE_URL}users/${user._id}/verify/${token.token}`;
				await sendEmail(user.email, "Verify Email", url);
				console.log(url)
			}

			return res
				.status(400)
				.send({ message: "An Email sent to your account please verify" });
		}
        
		//console.log(generateAuthToken());
		const token = user.generateAuthToken()
		
	     console.log(user)
		res.status(200).send({ data: token, userDetails:user, message: "logged in successfully" });
	} catch (error) {
		console.log(error.message)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
