import React, { useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { Link, useNavigate } from 'react-router-dom';
import { UsersApiClient, WorkspacesApiClient } from "../../../../api/fetch.functions";
import { useStateContext } from "../../../../contexts/dashboard-routes/ContextProvider";
import { useStore } from '@nanostores/react';
import { userWorkspaces } from "../../../../stores/workspace.store";

const IndexTableWorkspace = ({ currentUser }) => {

    // Should be memoized or stable
    const columns = [
        {
            accessorKey: '_id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'First Name',
        },
        {
            accessorKey: 'description',
            header: 'Description',
        },
    ];

    let $userWorkspaces = useStore(userWorkspaces);
    console.log('START $userWorkspaces IndexWorkspace: ', $userWorkspaces);

    const fetchData = async () => {
        try {
            console.log('currentUser IndexTableWorkspace: ', $userWorkspaces);
            let workspaces = currentUser.currentUser[0].workspaces;
            let userApi = await UsersApiClient.getUserReferences(currentUser.currentUser[0]._id);
            if (userApi) {
                workspaces = userApi[0].workspaces;
            }
            userWorkspaces.set(workspaces);
            console.log('UPDATE $userWorkspaces IndexWorkspace: ', $userWorkspaces);
            return workspaces;
        } catch (error) {
            console.log("Error charging data: ", error);
            return [];
        }
    }

    useEffect(() => {
        userWorkspaces.set(fetchData());
    }, []);

    console.log('END $userWorkspaces IndexWorkspace: ', $userWorkspaces);
    return <MaterialReactTable columns={columns} data={$userWorkspaces} />;
}

export default IndexTableWorkspace;
