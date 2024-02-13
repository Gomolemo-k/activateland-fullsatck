import { mongoose}  from "../../../../deps.ts";

const teamSchema  = new mongoose.Schema({
	workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
	name: { type: String, required: true },
	description: { type: String },
	teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TeamMember' }],
}, {
	timestamps: true
});


export default mongoose.model("Team", teamSchema);