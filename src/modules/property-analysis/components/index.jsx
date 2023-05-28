import React from 'react'
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from '../../../components/tables/Table'

async function IndexPropertyAnalysis(currentUser) {
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
    // const properties = currentUser.properties;
    // console.log('properties: ', properties);

    return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
        {/* <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
            <h1 className="text-xl font-semibold">PROPERTIES</h1>
        </div>
        <div className="mt-6">
            <Table columns={columns} data={properties} />
        </div>
        </main> */}
    </div>
    );
}

export default IndexPropertyAnalysis;