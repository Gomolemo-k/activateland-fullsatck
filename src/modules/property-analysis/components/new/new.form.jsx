import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PropertyAnalysisApiClient } from "../../../../api/fetch.functions"


const NewFormPropertyAnalysis = ({currentUser}) => {
    const queryParameters = new URLSearchParams(window.location.search)

    const [title, setTitle] = useState(Number(queryParameters.get("title")) || '')
    const [isPending, setIsPending] = useState(false)
    // Buy Cost
    const [tax, setTax] = useState(Number(queryParameters.get("tax")) || 0)
    const [price, setPrice] = useState(Number(queryParameters.get("price")) || 0)
    const [registrationCost, setRegistrationCost] = useState(Number(queryParameters.get("registrationCost")) || 0)
    const [mortgageCost, setMortgageCost] = useState(Number(queryParameters.get("mortgageCost")) || 0)
    const [rehabCost, setRehabCost] = useState(Number(queryParameters.get("rehabCost")) || 0)
    const [buyCommission, setBuyCommission] = useState(Number(queryParameters.get("buyCommission")) || 0)
    const [equipmentCost, setEquipmentCost] = useState(Number(queryParameters.get("equipmentCost")) || 0)
    const [otherFixCosts, setOtherFixCosts] = useState(Number(queryParameters.get("otherFixCosts")) || 0)
    // Rent incomes
    const [monthRentIncome, setMonthRentIncome] = useState(Number(queryParameters.get("monthRentIncome")) || 0)
    // % Value increase expected
    const [increaseValueExpected, setIncreaseValueExpected] = useState(Number(queryParameters.get("increaseValueExpected")) || 2)
    // Anual Expenses
    const [yearTaxes, setYearTaxes] = useState(Number(queryParameters.get("yearTaxes")) || 0)
    const [yearInsurance, setYearInsurance] = useState(Number(queryParameters.get("yearInsurance")) || 0)
    const [yearCommunityOwners, setYearCommunityOwners] = useState(Number(queryParameters.get("yearCommunityOwners")) || 0)
    const [yearMantenance, setYearMantenance] = useState(Number(queryParameters.get("yearMantenance")) || 0)
    const [yearEmptyPeiods, setYearEmptyPeiods] = useState(Number(queryParameters.get("yearEmptyPeiods")) || 0)
    // financement
    const [mortgagePercentage, setMortgagePercentage] = useState(Number(queryParameters.get("mortgagePercentage")) || 0)
    const [mortgageYears, setMortgageYears] = useState(Number(queryParameters.get("mortgageYears")) || 0)
    const [mortgageInterest, setMortgageInterest] = useState(Number(queryParameters.get("mortgageInterest")) || 0)
    // Calculate
    const taxAmount = Number(price) / Number(tax) || 0;
    const totalBuyAmount = Number(price) + Number(taxAmount) + Number(registrationCost) + Number(mortgageCost) + Number(rehabCost) + 
    Number(buyCommission) + Number(equipmentCost) + Number(otherFixCosts) || 0;
    const yearRentIncome = Number(monthRentIncome) * 12 || 0;
    const yearExpenses = Number(yearTaxes) + Number(yearInsurance) + Number(yearCommunityOwners) + Number(yearMantenance) + Number(yearEmptyPeiods) || 0;
    const monthExpenses = Number(yearExpenses / 12) || 0;
    const mortgageAmount = Number(price) * Number(mortgagePercentage) / 100 || 0;
    const ownCapital = Number(totalBuyAmount) - Number(mortgageAmount) || 0;
    const mortgageMonths = Number(mortgageYears) * 12 || 0;
    const monthMortgageInterest = Number(mortgageInterest) / 12 || 0;
    const monthMortgagePayment = calculateMortgagePayment(Number(mortgageAmount), Number(monthMortgageInterest), Number(mortgageMonths)) || 0;
    const monthInterestCost = ((Number(monthMortgagePayment) * 12 * Number(mortgageYears)) - Number(mortgageAmount)) / (Number(mortgageYears) * 12) || 0;
    const monthAmortization = Number(monthMortgagePayment) - Number(monthInterestCost) || 0;
    // Profit rates
    const monthCashFlow = Number(monthRentIncome) - Number(monthMortgagePayment) - Number(monthExpenses) || 0;
    const grossProfit = Number(yearRentIncome) / Number(totalBuyAmount) * 100 || 0;
    const netProfit = (Number(yearRentIncome) - Number(yearExpenses) - (Number(monthInterestCost) * 12)) / Number(totalBuyAmount) * 100 || 0;
    const mortgageVSrent = Number(mortgageMonths) / Number(monthRentIncome) * 100 || 0;
    const cashFlowVSrent = Number(monthCashFlow) / Number(monthRentIncome) * 100 || 0;
    const cashOnCash = (Number(monthCashFlow) * 12) / Number(ownCapital) * 100 || 0;
    const roce = ((Number(monthCashFlow) * 12) + (Number(monthAmortization) * 12)) / Number(ownCapital) * 100 || 0;
    const totalReturnInvestment = ((Number(yearRentIncome) - Number(yearExpenses) - (Number(monthInterestCost) * 12 / 100)) / (Number(ownCapital) + Number(increaseValueExpected))) * 100 || 0;


    const navigate = useNavigate();
    // const user = currentUser?.currentUser[0];

    function calculateMortgagePayment(loanAmount, interestRate, term) {
        var monthlyInterestRate = interestRate / 100; // Convert the annual interest rate to a monthly decimal rate
        var totalPayments = term; // Calculate the total number of monthly payments
      
        var payment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
      
        return payment;
    }

    async function handleSubmitNewPropertyAnalysis(event) {
        try {
            // event?.proeventDefault();
            setIsPending(true);
            // const propertyAnalysisData = {
            //     user: user._id,
            //     name: name,
            //     description: description,
            // }
            // let propertyAnalysisSave;
            // propertyAnalysisSave = await PropertyAnalysisApiClient.postApiPropertyAnalysis(propertyAnalysisData);
            
            // console.log('propertyAnalysisSave 1:', propertyAnalysisSave)
            // if (propertyAnalysisSave?._id) {
            //     setProject(propertyAnalysisSave);
            // }
        } catch (error) {
            console.error("Error handleSubmitNewPropertyAnalysis: ", error);
        } finally {
            setIsPending(false);
        }
        navigate("/property-analysis/new");
    }

    return (
        <div className="flex flex-col w-full p-10 space-y-4 bg-white rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
            <form onSubmit={handleSubmitNewPropertyAnalysis}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Generate Prperty Analysis</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Calculate the profitability of the investements and future opportunities.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Title
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Title/</span>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={title} 
                                        onChange={(e) => setTitle(e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Buy Expenses Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Insert related buy expenses of your property or investment opportunity.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                            Buy price
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={price.toFixed(2)} 
                                        onChange={(e) => setPrice(e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="tax" className="block text-sm font-medium leading-6 text-gray-900">
                                Taxes
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">%/</span>
                                    <input
                                        type="number"
                                        name="tax"
                                        id="tax"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={tax.toFixed(2)} 
                                        onChange={(e) => setTax(e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="registrationCost" className="block text-sm font-medium leading-6 text-gray-900">
                                Registration Expenses
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                    <input
                                        type="number"
                                        name="registrationCost"
                                        id="registrationCost"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={registrationCost.toFixed(2)} 
                                        onChange={(e) => setRegistrationCost(e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="mortgageCost" className="block text-sm font-medium leading-6 text-gray-900">
                                Mortgage Registration Expenses
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                    <input
                                        type="number"
                                        name="mortgageCost"
                                        id="mortgageCost"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={mortgageCost.toFixed(2)} 
                                        onChange={(e) => setMortgageCost(e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="rehabCost" className="block text-sm font-medium leading-6 text-gray-900">
                                Rehabilitation Expenses
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                    <input
                                        type="number"
                                        name="rehabCost"
                                        id="rehabCost"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={rehabCost.toFixed(2)} 
                                        onChange={(e) => setRehabCost(e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="buyCommission" className="block text-sm font-medium leading-6 text-gray-900">
                                Buy Commission
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                    <input
                                        type="number"
                                        name="buyCommission"
                                        id="buyCommission"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={buyCommission.toFixed(2)} 
                                        onChange={(e) => setBuyCommission(e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="equipmentCost" className="block text-sm font-medium leading-6 text-gray-900">
                                Equipment Expenses
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                    <input
                                        type="number"
                                        name="equipmentCost"
                                        id="equipmentCost"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={equipmentCost.toFixed(2)} 
                                        onChange={(e) => setEquipmentCost(e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="otherFixCosts" className="block text-sm font-medium leading-6 text-gray-900">
                                Other Expenses
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                    <input
                                        type="number"
                                        name="otherFixCosts"
                                        id="otherFixCosts"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={otherFixCosts.toFixed(2)} 
                                        onChange={(e) => setOtherFixCosts(e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Incomes and Revaluation Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Insert month incomes and year revaluation of your property or investment opportunity.</p>

                        <div className="sm:col-span-3">
                            <label htmlFor="monthRentIncome" className="block text-sm font-medium leading-6 text-gray-900">
                                Month Rent and Other Incomes
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                    <input
                                        type="number"
                                        name="monthRentIncome"
                                        id="monthRentIncome"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={monthRentIncome.toFixed(2)} 
                                        onChange={(e) => setMonthRentIncome(e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="otheincreaseValueExpectedrFixCosts" className="block text-sm font-medium leading-6 text-gray-900">
                                Percentage of Revaluation Expected
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">%/</span>
                                    <input
                                        type="number"
                                        name="increaseValueExpected"
                                        id="increaseValueExpected"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={increaseValueExpected.toFixed(2)} 
                                        onChange={(e) => setIncreaseValueExpected(e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Annual Expenses Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Insert related annual and mantenance expenses of your property or investment opportunity.</p>

                        <div className="sm:col-span-3">
                            <label htmlFor="yearTaxes" className="block text-sm font-medium leading-6 text-gray-900">
                                Annual Taxes
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                    <input
                                        type="number"
                                        name="yearTaxes"
                                        id="yearTaxes"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={yearTaxes.toFixed(2)} 
                                        onChange={(e) => setYearTaxes(e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="yearInsurance" className="block text-sm font-medium leading-6 text-gray-900">
                                Annual Insurances
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                    <input
                                        type="number"
                                        name="yearInsurance"
                                        id="yearInsurance"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={yearInsurance.toFixed(2)} 
                                        onChange={(e) => setYearInsurance(e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="yearCommunityOwners" className="block text-sm font-medium leading-6 text-gray-900">
                                Annual Community Owners
                            </label>
                            <div className="mt-2">
                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                <input
                                type="number"
                                name="yearCommunityOwners"
                                id="yearCommunityOwners"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={yearCommunityOwners.toFixed(2)} 
                                onChange={(e) => setYearCommunityOwners(e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="yearMantenance" className="block text-sm font-medium leading-6 text-gray-900">
                                Annual mantenance
                            </label>
                            <div className="mt-2">
                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                <input
                                type="number"
                                name="yearMantenance"
                                id="yearMantenance"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={yearMantenance.toFixed(2)} 
                                onChange={(e) => setYearMantenance(e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="yearEmptyPeiods" className="block text-sm font-medium leading-6 text-gray-900">
                                Annual Expected Empty Periods Cost
                            </label>
                            <div className="mt-2">
                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                <input
                                type="number"
                                name="yearEmptyPeiods"
                                id="yearEmptyPeiods"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={yearEmptyPeiods.toFixed(2)} 
                                onChange={(e) => setYearEmptyPeiods(e.target.value)} 
                                />
                            </div>
                        </div>

                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Finance Expenses Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Insert related financing and mortgage expenses of your property or investment opportunity.</p>

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="mortgagePercentage" className="block text-sm font-medium leading-6 text-gray-900">
                                Mortgage Percentage of Property Price.
                            </label>
                            <div className="mt-2">
                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                <input
                                type="number"
                                name="mortgagePercentage"
                                id="mortgagePercentage"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={mortgagePercentage.toFixed(2)} 
                                onChange={(e) => setMortgagePercentage(e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="mortgageYears" className="block text-sm font-medium leading-6 text-gray-900">
                                Mortgage Years Duration
                            </label>
                            <div className="mt-2">
                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                <input
                                type="number"
                                name="mortgageYears"
                                id="mortgageYears"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={mortgageYears.toFixed(2)} 
                                onChange={(e) => setMortgageYears(e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="mortgageInterest" className="block text-sm font-medium leading-6 text-gray-900">
                                Mortgage Interest Percentage
                            </label>
                            <div className="mt-2">
                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">%/</span>
                                <input
                                type="number"
                                name="mortgageInterest"
                                id="mortgageInterest"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={mortgageInterest.toFixed(2)} 
                                onChange={(e) => setMortgageInterest(e.target.value)} 
                                />
                            </div>
                        </div>

                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Report Generated</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This is the report generated. Feel free to analyse it!
                        </p>

                        <div className="mt-10 space-y-10">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Data Calculated</legend>
                                
                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="taxAmount" className="block text-sm font-medium leading-6 text-gray-900">
                                        Taxes Amount
                                    </label>
                                    <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                        <input
                                        type="number"
                                        name="taxAmount"
                                        id="taxAmount"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={taxAmount.toFixed(2)}
                                        disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="totalBuyAmount" className="block text-sm font-medium leading-6 text-gray-900">
                                        Total Buy Cost Amount
                                    </label>
                                    <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                        <input
                                        type="number"
                                        name="totalBuyAmount"
                                        id="totalBuyAmount"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={totalBuyAmount.toFixed(2)}
                                        disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="yearExpenses" className="block text-sm font-medium leading-6 text-gray-900">
                                        Year Expenses
                                    </label>
                                    <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                        <input
                                        type="number"
                                        name="yearExpenses"
                                        id="yearExpenses"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={yearExpenses.toFixed(2)}
                                        disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="yearRentIncome" className="block text-sm font-medium leading-6 text-gray-900">
                                        Annual Incomes
                                    </label>
                                    <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                        <input
                                        type="number"
                                        name="yearRentIncome"
                                        id="yearRentIncome"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={yearRentIncome.toFixed(2)}
                                        disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="mortgageAmount" className="block text-sm font-medium leading-6 text-gray-900">
                                        Total Mortgage Amount
                                    </label>
                                    <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                        <input
                                        type="number"
                                        name="mortgageAmount"
                                        id="mortgageAmount"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={mortgageAmount.toFixed(2)}
                                        disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="ownCapital" className="block text-sm font-medium leading-6 text-gray-900">
                                        Own Capital
                                    </label>
                                    <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                        <input
                                        type="number"
                                        name="ownCapital"
                                        id="ownCapital"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={ownCapital.toFixed(2)}
                                        disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="monthMortgagePayment" className="block text-sm font-medium leading-6 text-gray-900">
                                        Month Mortgage Payment
                                    </label>
                                    <div className="mt-2">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                        <input
                                        type="number"
                                        name="monthMortgagePayment"
                                        id="monthMortgagePayment"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={monthMortgagePayment.toFixed(2)}
                                        disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="monthInterestCost" className="block text-sm font-medium leading-6 text-gray-900">
                                        Month Interest Cost
                                    </label>
                                    <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                        <input
                                        type="number"
                                        name="monthInterestCost"
                                        id="monthInterestCost"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={monthInterestCost.toFixed(2)}
                                        disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="monthAmortization" className="block text-sm font-medium leading-6 text-gray-900">
                                        Month Amortization
                                    </label>
                                    <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                        <input
                                        type="number"
                                        name="monthAmortization"
                                        id="monthAmortization"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={monthAmortization.toFixed(2)}
                                        disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="mortgageMonths" className="block text-sm font-medium leading-6 text-gray-900">
                                        Mortgage Months
                                    </label>
                                    <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">No. Months/</span>
                                        <input
                                        type="number"
                                        name="mortgageMonths"
                                        id="mortgageMonths"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={mortgageMonths.toFixed(2)}
                                        disabled={true}
                                        />
                                    </div>
                                </div>

                            </fieldset>

                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Profitability Rates</legend>
                                <p className="mt-1 text-sm leading-6 text-gray-600">These are the most important profitability rates.</p>
                                
                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="monthCashFlow" className="block text-sm font-medium leading-6 text-gray-900">
                                        Month Cash-Flow
                                    </label>
                                    <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">$/</span>
                                        <input
                                        type="number"
                                        name="monthCashFlow"
                                        id="monthCashFlow"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={monthCashFlow.toFixed(2)}
                                        disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="grossProfit" className="block text-sm font-medium leading-6 text-gray-900">
                                        Gross Profit
                                    </label>
                                    <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">%/</span>
                                        <input
                                        type="number"
                                        name="grossProfit"
                                        id="grossProfit"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={grossProfit.toFixed(2)}
                                        disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="netProfit" className="block text-sm font-medium leading-6 text-gray-900">
                                        Net Profit
                                    </label>
                                    <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">%/</span>
                                        <input
                                        type="number"
                                        name="netProfit"
                                        id="netProfit"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={netProfit.toFixed(2)}
                                        disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="mortgageVSrent" className="block text-sm font-medium leading-6 text-gray-900">
                                        Mortgage / Rent
                                    </label>
                                    <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">%/</span>
                                        <input
                                        type="number"
                                        name="mortgageVSrent"
                                        id="mortgageVSrent"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={mortgageVSrent.toFixed(2)}
                                        disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="cashFlowVSrent" className="block text-sm font-medium leading-6 text-gray-900">
                                        Cash-Flow / Rent
                                    </label>
                                    <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">%/</span>
                                        <input
                                        type="number"
                                        name="cashFlowVSrent"
                                        id="cashFlowVSrent"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={cashFlowVSrent.toFixed(2)}
                                        disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="cashOnCash" className="block text-sm font-medium leading-6 text-gray-900">
                                        Cash-On-Cash
                                    </label>
                                    <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">%/</span>
                                        <input
                                        type="number"
                                        name="cashOnCash"
                                        id="cashOnCash"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={cashOnCash.toFixed(2)}
                                        disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="roce" className="block text-sm font-medium leading-6 text-gray-900">
                                        ROCE
                                    </label>
                                    <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">%/</span>
                                        <input
                                        type="number"
                                        name="roce"
                                        id="roce"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={roce.toFixed(2)}
                                        disabled={true}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="totalReturnInvestment" className="block text-sm font-medium leading-6 text-gray-900">
                                        Return of Investment
                                    </label>
                                    <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">%/</span>
                                        <input
                                        type="number"
                                        name="totalReturnInvestment"
                                        id="totalReturnInvestment"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={totalReturnInvestment.toFixed(2)}
                                        disabled={true}
                                        />
                                    </div>
                                </div>

                            </fieldset>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <>
                        <Link to="/property-analysis/index" type="button" className="bt text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
                        {!isPending && <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Generate</button>}
                        {isPending && <button disabled className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Generate</button>}
                    </>
                </div>
            </form>
        </div>
    )
}

export default NewFormPropertyAnalysis;