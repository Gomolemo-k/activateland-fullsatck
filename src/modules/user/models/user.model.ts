import { mongoose}  from "../../../../deps.ts";
import jwt from "npm:jsonwebtoken@9.0.0";
import Joi from "npm:joi@17.9.2";
import passwordComplexity from "npm:joi-password-complexity@5.1.0";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
	lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, Deno.env.get('JWTPRIVATEKEY'), {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

export { User, validate };
