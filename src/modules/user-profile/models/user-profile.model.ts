import { mongoose}  from "../../../../deps.ts";

const userProfileSchema  = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	bio: { type: String },
	userPhoto: { type: mongoose.Schema.Types.ObjectId, ref: 'UploadedFile' },
	userLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
}, {
	timestamps: true
});


export default mongoose.model("UserProfile", userProfileSchema);