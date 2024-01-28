import React, { useState, useEffect } from 'react'
import MaterialReactTable from 'material-react-table';
import { Link, useNavigate } from 'react-router-dom'
import { UsersApiClient, PropertiesApiClient } from "../../../../api/fetch.functions"
import { useStateContext } from "../../../../contexts/dashboard-routes/ContextProvider"
import { useStore } from '@nanostores/react';
import { userProperties } from "../../../../stores/property.store"

const IndexTableProperty = ({currentUser}) => {

    //should be memoized or stable
    const columns = [
                        {
                            accessorKey: '_id',
                            header: 'ID',
                        },
                        {
                            accessorKey: 'Workspace._id',
                            header: 'Workspace',
                        },
                        {
                            accessorKey: 'title',
                            header: 'Title',
                        },
                        {
                            accessorKey: 'propertyType',
                            header: 'Type',
                        },
                        {
                            accessorKey: 'size',
                            header: 'Size',
                        },
                    ];

    // const { userPropertyes, setUserProperties } = useStateContext();
    let $userProperties = useStore(userProperties);
    console.log('START $userProperties IndexTableProperty: ', $userProperties);

    const fetchData = async () => {
        try {
            console.log('currentUser IndexTableProperty: ', $userProperties);
            // let properties = currentUser.currentUser[0].Worksapces[0].properties;
            let properties = [];
            // console.log('workspaces IndexWorkspace 0: ', workspaces);
            let userApi = await UsersApiClient.getUserReferences(currentUser.currentUser[0]._id);
            if (userApi) {
                // console.log('userApi IndexTableProperty: ', userApi);
                // properties = userApi[0].properties;
            }
            // setUserWorkspaces(workspaces);
            // userWorkspaces.set(properties);
            console.log('UPDATE $userProperties IndexTableProperty: ', $userProperties);
            return properties;
        } catch (error) {
            console.log("Error charging data: ", error);
            return [];
        }
    }

    useEffect(() => {
        userProperties.set(fetchData());
    }, []);

    console.log('END $userProperties IndexTableProperty: ', userProperties);
    return <MaterialReactTable columns={columns} data={userProperties} />;
}

export default IndexTableProperty;