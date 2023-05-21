import { mongoose}  from "../../../../deps.ts";

const propertyAnalysisSchema  = new mongoose.Schema({
	property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
	title: { type: String, required: true },
	description: { type: String },
	rentalIncome: { type: Number },
	netIncome: { type: Number },
	returnOnInvestment: { type: Number },
	purchasePrice: { type: Number },
	rehabAmount: { type: Number },
	salesCommission: { type: Number },
	additionalCosts: { type: Number },
	annualCosts: { type: Number },
	mortgageAmount: { type: Number },
	mortgageInterest: { type: Number },
	mortgageCosts: { type: Number },
	taxes: { type: Number },
	registrationFees: { type: Number },
}, {
	timestamps: true
});

export default mongoose.model("PropertyAnalysis", propertyAnalysisSchema);
