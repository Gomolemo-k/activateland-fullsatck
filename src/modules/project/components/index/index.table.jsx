import React, { useState, useEffect } from 'react'
import MaterialReactTable from 'material-react-table';
import { Link, useNavigate } from 'react-router-dom'
import { UsersApiClient, ProjectsApiClient } from "../../../../api/fetch.functions"
import { useStateContext } from "../../../../contexts/dashboard/ContextProvider"
import { useStore } from '@nanostores/react';
import { userProjects } from "../../../../stores/project.store"

const IndexTableProject = ({currentUser}) => {

    //should be memoized or stable
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

    // const { userProjects, setUserProjects } = useStateContext();
    let $userProjects = useStore(userProjects);
    console.log('START $userProjects IndexProject: ', $userProjects);

    const fetchData = async () => {
        try {
            console.log('currentUser IndexTableProject: ', $userProjects);
            let projects = currentUser.currentUser[0].projects;
            // console.log('projects IndexProject 0: ', projects);
            let userApi = await UsersApiClient.getUserReferences(currentUser.currentUser[0]._id);
            if (userApi) {
                // console.log('userApi IndexTableProject: ', userApi);
                projects = userApi[0].projects;
            }
            // setUserProjects(projects);
            userProjects.set(projects);
            console.log('UPDATE $userProjects IndexProject: ', $userProjects);
            return projects;
        } catch (error) {
            console.log("Error charging data: ", error);
            return [];
        }
    }

    useEffect(() => {
        userProjects.set(fetchData());
    }, []);

    console.log('END $userProjects IndexProject: ', $userProjects);
    return <MaterialReactTable columns={columns} data={$userProjects} />;
}

export default IndexTableProject;