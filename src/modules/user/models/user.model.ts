import { mongoose}  from "../../../../deps.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import jwt from "npm:jsonwebtoken@9.0.0";
import Joi from "npm:joi@17.9.2";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  workspaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }],
  userProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' },
  userAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount' },
  userSession: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSession' },
}, {
	timestamps: true
});

function generateRandomPassword(): string {
	const randomString = Math.random().toString(36).slice(-8);
	return randomString;
}

async function hashPassword(pass: string): Promise<string> {
	const salt = await bcrypt.genSalt(Number(Deno.env.get('SALT')||'8'));
	const hashPass = await bcrypt.hash(pass, salt);
	return hashPass;
}

userSchema.pre('validate', function(next) {
	if (!this.password) {
	  this.password = generateRandomPassword();
	}
	next();
  });

userSchema.pre("save", async function(next) {
	if (!this.isModified("password")) return next();
	try {
		if (!this.password) this.password = generateRandomPassword();
		if (this.password) this.password = await hashPassword(this.password);
		return next();
	} catch (error) {
		console.log(error)
	  	return next(error);
	}
});

const validate = (data: { email: string, password: string }) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

// export default mongoose.model("User", userSchema);

const User = mongoose.model("User", userSchema);

export { User, validate, generateRandomPassword, hashPassword };