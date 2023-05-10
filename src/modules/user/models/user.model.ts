import { mongoose}  from "../../../../deps.ts";
import jwt from "npm:jsonwebtoken@9.0.0";
import Joi from "npm:joi@17.9.2";

const userSchema = new mongoose.Schema({
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
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

export { User, validate };
