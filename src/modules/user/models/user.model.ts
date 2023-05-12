import { mongoose}  from "../../../../deps.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import jwt from "npm:jsonwebtoken@9.0.0";
import Joi from "npm:joi@17.9.2";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
}, {
	timestamps: true
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, Deno.env.get('JWTPRIVATEKEY'), {
		expiresIn: "7d",
	});
	return token;
};

userSchema.methods.generateRandomPassword = function () {
	const randomString = Math.random().toString(36).slice(-8);
	return randomString;
};

userSchema.methods.hashPassword = async function (pass: string) {
	const salt = await bcrypt.genSalt(Number(Deno.env.get('SALT') || 8));
	const hashPass = await bcrypt.hash(pass, salt);
	return hashPass;
};

userSchema.pre("save", async function(next) {
	if (!this.isModified("password")) return next();
	try {
		if (!this.password) this.password = userSchema.methods.generateRandomPassword();
		this.password = await userSchema.methods.hashPassword(this.password);
		return next();
	} catch (error) {
		console.log(error)
	  	return next(error);
	}
});

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

export { User, validate };
