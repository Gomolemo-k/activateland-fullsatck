import React, { useState, useEffect } from 'react'
import MaterialReactTable from 'material-react-table';
import { Link, useNavigate } from 'react-router-dom'
import { UsersApiClient, TeamMembersApiClient } from "../../../../api/fetch.functions"
import { useStateContext } from "../../../../contexts/dashboard-routes/ContextProvider"
import { useStore } from '@nanostores/react';
import { userTeamMembers } from "../../../../stores/team-member.store"

const IndexTableTeamMember = ({currentUser}) => {

    //should be memoized or stable
    const columns = [
                        {
                            accessorKey: 'user._id',
                            header: 'User',
                        },
                        {
                            accessorKey: 'role',
                            header: 'Role',
                        },
                    ];

    // const { userTeamMembers, setUserTeamMembers } = useStateContext();
    let $userTeamMembers = useStore(userTeamMembers);
    console.log('START $userTeamMembers IndexTeamMember: ', $userTeamMembers);

    const fetchData = async () => {
        try {
            console.log('currentUser IndexTableTeamMember: ', $userTeamMembers);
            // let teamMembers = currentUser.currentUser[0].projects[0].team[0].teamMembers;
            let teamMembers = [];
            // console.log('teamMembers IndexTeamMember 0: ', teamMembers);
            let userApi = await UsersApiClient.getUserReferences(currentUser.currentUser[0]._id);
            if (userApi) {
                // console.log('userApi IndexTableTeamMember: ', userApi);
                // teamMembers = userApi[0].teamMembers;
            }
            // setUserTeamMembers(teamMembers);
            // userTeamMembers.set(teamMembers);
            console.log('UPDATE $userTeamMembers IndexTeamMember: ', $userTeamMembers);
            return teamMembers;
        } catch (error) {
            console.log("Error charging data: ", error);
            return [];
        }
    }

    useEffect(() => {
        userTeamMembers.set(fetchData());
    }, []);

    console.log('END $userTeamMembers IndexTeamMember: ', $userTeamMembers);
    return <MaterialReactTable columns={columns} data={$userTeamMembers} />;
}

export default IndexTableTeamMember;