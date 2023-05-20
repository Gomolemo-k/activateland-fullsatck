import { mongoose}  from "../../../../deps.ts";

const projectSchema  = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	name: { type: String, required: true },
	description: { type: String },
}, {
	timestamps: true
});


export default mongoose.model("Project", projectSchema);