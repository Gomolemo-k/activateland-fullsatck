import { mongoose}  from "../../../../deps.ts";

const locationSchema  = new mongoose.Schema({
	latitude: { type: Number, required: true },
	longitude: { type: Number, required: true },
	address: { type: String, required: true },
	city: { type: String, required: true },
	country: { type: String, required: true },
	postalCode: { type: String, required: true },    
}, {
	timestamps: true
});


export default mongoose.model("Location", locationSchema);