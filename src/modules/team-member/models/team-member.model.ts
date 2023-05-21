import { mongoose}  from "../../../../deps.ts";

const teamMemberRole = {
	NONE: 'NONE',
	VIEW: 'VIEW',
	ALL: 'ALL',
}


const teamMemberSchema  = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	role: { type: String, enum: Object.values(teamMemberRole), required: true, default: teamMemberRole.VIEW },
}, {
	timestamps: true
});


// export default mongoose.model("TeamMember", teamMemberSchema);
const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

export { TeamMember, teamMemberRole };