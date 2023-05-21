import { mongoose}  from "../../../../deps.ts";

const uploadedFileSchema  = new mongoose.Schema({
	name: String,
	type: String,
	url: String,  
}, {
	timestamps: true
});


export default mongoose.model("UploadedFile", uploadedFileSchema);