import React, { useState, useEffect } from 'react'
import MaterialReactTable from 'material-react-table';
import { Link, useNavigate } from 'react-router-dom'
import { UsersApiClient, PropertyAnalysisApiClient } from "../../../../api/fetch.functions"
import { useStateContext } from "../../../../contexts/dashboard/ContextProvider"
import { useStore } from '@nanostores/react';
import { userPropertyAnalysis } from "../../../../stores/property-analysis.store"

const IndexTablePropertyAnalysis = ({currentUser}) => {

    //should be memoized or stable
    const columns = [
                        {
                            accessorKey: '_id',
                            header: 'ID',
                        },
                        {
                            accessorKey: 'property._id',
                            header: 'Property',
                        },
                        {
                            accessorKey: 'title',
                            header: 'Title',
                        },
                        {
                            accessorKey: 'rentalIncome',
                            header: 'Rental Income',
                        },
                        {
                            accessorKey: 'netIncome',
                            header: 'Net Income',
                        },
                        {
                            accessorKey: 'returnOnInvestment',
                            header: 'Return On Investment',
                        },
                        {
                            accessorKey: 'purchasePrice',
                            header: 'Purchase Price',
                        },
                        {
                            accessorKey: 'annualCosts',
                            header: 'Annual Costs',
                        },
                    ];

    // const { userPropertyAnalysis, setUserPropertyAnalysis } = useStateContext();
    let $userPropertyAnalysis = useStore(userPropertyAnalysis);
    console.log('START $userPropertyAnalysis IndexPropertyAnalysis: ', $userPropertyAnalysis);

    const fetchData = async () => {
        try {
            console.log('currentUser IndexTablePropertyAnalysis: ', $userPropertyAnalysis);
            let propertyAnalysis = currentUser.currentUser[0].propertyAnalysis;
            // console.log('PropertyAnalysis IndexPropertyAnalysis 0: ', propertyAnalysis);
            let userApi = await UsersApiClient.getUserReferences(currentUser.currentUser[0]._id);
            if (userApi) {
                // console.log('userApi IndexTablePropertyAnalysis: ', userApi);
                propertyAnalysis = userApi[0].propertyAnalysis;
            }
            // setUserPropertyAnalysis(propertyAnalysis);
            userPropertyAnalysis.set(propertyAnalysis);
            console.log('UPDATE $userPropertyAnalysis IndexPropertyAnalysis: ', $userPropertyAnalysis);
            return propertyAnalysis;
        } catch (error) {
            console.log("Error charging data: ", error);
            return [];
        }
    }

    useEffect(() => {
        userPropertyAnalysis.set(fetchData());
    }, []);

    console.log('END $userPropertyAnalysis IndexPropertyAnalysis: ', $userPropertyAnalysis);
    return <MaterialReactTable columns={columns} data={$userPropertyAnalysis} />;
}

export default IndexTablePropertyAnalysis;