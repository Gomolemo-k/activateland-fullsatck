import React from 'react'
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from '../../../components/tables/Table'

async function IndexProject(currentUser) {
    const columns = React.useMemo(() => [
        {
            Header: "Name",
            accessor: 'name',
            Filter: SelectColumnFilter,
            filter: 'includes',
        },
        {
            Header: "Description",
            accessor: 'description',
            Filter: SelectColumnFilter,
            filter: 'includes',
        },
    ], [])

    // const data = React.useMemo(() => getData(), [])
    const projects = currentUser.projects;
    console.log('projects: ', projects);

    return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
            <h1 className="text-xl font-semibold">PROJECTS</h1>
        </div>
        <div className="mt-6">
            <Table columns={columns} data={projects} />
        </div>
        </main>
    </div>
    );
}

export default IndexProject;