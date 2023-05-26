import { mongoose}  from "../../../../deps.ts";

const teamSchema  = new mongoose.Schema({
	project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
	name: { type: String, required: true },
	description: { type: String },
	teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TeamMember' }],
}, {
	timestamps: true
});


export default mongoose.model("Team", teamSchema);