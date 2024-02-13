import { mongoose}  from "../../../../deps.ts";

const userAccountType = {
	FREE: 'FREE',
	BASIC: 'BASIC',
	PRO: 'PRO',
}

const userAccountSchema  = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	type: { type: String, enum: Object.values(userAccountType), default: userAccountType.FREE },
	purchase: { type: Number, default: 0 },
	expiresAt: { type: Date, required: true },
}, {
	timestamps: true
});


// export default mongoose.model("UserAccount", userAccountSchema);
const UserAccount = mongoose.model("UserAccount", userAccountSchema);

export { UserAccount, userAccountType };