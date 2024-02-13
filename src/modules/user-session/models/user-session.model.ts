import { mongoose}  from "../../../../deps.ts";

const userSessionSchema  = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	token: { type: String, unique: true, required: true },
	expiresAt: { type: Date },  
}, {
	timestamps: true
});


export default mongoose.model("UserSession", userSessionSchema);