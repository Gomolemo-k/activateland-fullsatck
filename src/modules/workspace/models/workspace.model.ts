import { mongoose}  from "../../../../deps.ts";

const workspaceSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	name: { type: String, required: true },
	description: { type: String },
	teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
	properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
}, {
	timestamps: true
});


export default mongoose.model("Workspace", workspaceSchema);
