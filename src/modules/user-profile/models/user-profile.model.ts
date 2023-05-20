import { mongoose}  from "../../../../deps.ts";
// import updatedFileSchema from "../../updated-file/models/updated-file.model.ts";
// import locationSchema from "../../location/models/location.model.ts";

const userProfileSchema  = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	bio: { type: String },
	// userPhoto: updatedFileSchema,
	// userLocation: locationSchema,
}, {
	timestamps: true
});


export default mongoose.model("UserProfile", userProfileSchema);