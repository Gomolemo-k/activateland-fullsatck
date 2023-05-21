import { mongoose}  from "../../../../deps.ts";

const teamSchema  = new mongoose.Schema({
	project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
	name: { type: String, required: true },
	description: { type: String },
	members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TeamMember', required: true }],
}, {
	timestamps: true
});


export default mongoose.model("Team", teamSchema);