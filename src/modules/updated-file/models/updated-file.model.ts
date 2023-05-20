import { mongoose}  from "../../../../deps.ts";

const updatedFileSchema  = new mongoose.Schema({
	name: String,
	type: String,
	url: String,  
}, {
	timestamps: true
});


export default mongoose.model("UpdatedFile", updatedFileSchema);