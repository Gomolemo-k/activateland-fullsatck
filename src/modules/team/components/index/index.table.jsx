import React, { useState, useEffect } from 'react'
import MaterialReactTable from 'material-react-table';
import { Link, useNavigate } from 'react-router-dom'
import { UsersApiClient, TeamsApiClient } from "../../../../api/fetch.functions"
import { useStateContext } from "../../../../contexts/dashboard-routes/ContextProvider"
import { useStore } from '@nanostores/react';
import { userTeams } from "../../../../stores/team.store"

const IndexTableTeam = ({currentUser}) => {

    //should be memoized or stable
    const columns = [
                        {
                            accessorKey: '_id',
                            header: 'ID',
                        },
                        {
                            accessorKey: 'workspace._id',
                            header: 'Workspace',
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

    // const { userTeams, setUserTeams } = useStateContext();
    let $userTeams = useStore(userTeams);
    console.log('START $userTeams IndexTeam: ', $userTeams);

    const fetchData = async () => {
        try {
            console.log('currentUser IndexTableTeam: ', $userTeams);
            // let teams = currentUser.currentUser[0].workspace.teams;
            let teams = [];
            // console.log('teams IndexTeam 0: ', teams);
            let userApi = await UsersApiClient.getUserReferences(currentUser.currentUser[0]._id);
            if (userApi) {
                // console.log('userApi IndexTableTeam: ', userApi);
                // teams = userApi[0].teams;
            }
            // setUserTeams(teams);
            // userTeams.set(teams);
            console.log('UPDATE $userTeams IndexTeam: ', $userTeams);
            return teams;
        } catch (error) {
            console.log("Error charging data: ", error);
            return [];
        }
    }

    useEffect(() => {
        userTeams.set(fetchData());
    }, []);

    console.log('END $userTeams IndexTeam: ', $userTeams);
    return <MaterialReactTable columns={columns} data={$userTeams} />;
}

export default IndexTableTeam;