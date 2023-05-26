import { mongoose}  from "../../../../deps.ts";

const propertyType = {
	HOUSE: 'HOUSE',
	FLAT: 'FLAT',
	APARTMENT: 'APARTMENT',
	TOWNHOUSE: 'TOWNHOUSE',
	VILLA: 'VILLA',
	PENTHOUSE: 'PENTHOUSE',
	STUDIO: 'STUDIO',
	LOFT: 'LOFT',
	DUPLEX: 'DUPLEX',
	TRIPLEX: 'TRIPLEX',
	BUNGALOW: 'BUNGALOW',
	OFFICE: 'OFFICE',
	RETAIL: 'RETAIL',
	WAREHOUSE: 'WAREHOUSE',
	INDUSTRIAL: 'INDUSTRIAL',
	LAND: 'LAND',
	FARM: 'FARM',
	HOTEL: 'HOTEL',
	HOSTEL: 'HOSTEL',
	MOBILE_HOME: 'MOBILE_HOME',
	BOAT_HOUSE: 'BOAT_HOUSE',
}

const propertySchema  = new mongoose.Schema({
	project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
	title: { type: String, required: true },
	propertyType: { type: String, enum: Object.values(propertyType), required: true, default: propertyType.HOUSE },
	bedrooms: { type: Number, required: true },
	bathrooms: { type: Number, required: true },
	size: { type: Number, required: true },
	price: { type: Number },
	description: { type: String },
	mainImage: { type: mongoose.Schema.Types.ObjectId, ref: 'UploadedFile' },
	images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UploadedFile' }],
	location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
	constructionYear: { type: Number },
	isFurnished: { type: Boolean, default: false },
	isAvailable: { type: Boolean, default: true },
	propertyAnalysis: { type: mongoose.Schema.Types.ObjectId, ref: 'PropertyAnalysis' },
}, {
	timestamps: true
});


// export default mongoose.model("Property", propertySchema);
const Property = mongoose.model("Property", propertySchema);

export { Property, propertyType };