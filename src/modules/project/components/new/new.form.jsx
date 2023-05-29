import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Link, useNavigate } from 'react-router-dom'
import { ProjectsApiClient } from "../../../../api/fetch.functions"
import { useStateContext } from "../../../../contexts/dashboard/ContextProvider"


const NewFormProject = ({currentUser}) => {
    const queryParameters = new URLSearchParams(window.location.search)

    const { setUserByEmail, setCurrentUser } = useStateContext();
    const [project, setProject] = useState(undefined)
    const [name, setName] = useState(queryParameters.get("name") || '')
    const [description, setDescription] = useState(queryParameters.get("description") || '')
    const [isPending, setIsPending] = useState(false)

    const navigate = useNavigate();
    const user = currentUser?.currentUser[0];

    async function handleSubmitNewProject(event) {
        try {
            console.log('project handle: ', project)
            // event?.proeventDefault();
            setIsPending(true);
            const projectData = {
                user: user._id,
                name: name,
                description: description,
            }
            let projectSaved;

            projectSaved = await ProjectsApiClient.postApiProjects(projectData);
            
            console.log('projectSaved 1:', projectSaved)
            if (projectSaved?._id) {
                setProject(projectSaved);
            }
        } catch (error) {
            console.error("Error saving: ", error);
            navigate("/projects/new");
        } finally {
            setIsPending(false);
        }
        navigate("/projects/index");
    }

    return (
        <div className="flex flex-col w-full p-10 space-y-4 bg-white rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
            <form onSubmit={handleSubmitNewProject}>
                <fieldset>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">New Project</h2>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div className="sm:col-span-4">
                                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                        Name
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">@</span> */}
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                autoComplete="name"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                value={name} 
                                                onChange={(e) => setName(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                        Description
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">@</span> */}
                                            <input
                                                type="description"
                                                name="description"
                                                id="description"
                                                autoComplete="description"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                value={description} 
                                                onChange={(e) => setDescription(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <>
                            <Link to="/projects/index" type="button" className="bt text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
                            {!isPending && <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>}
                            {isPending && <button disabled className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>}
                        </>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

export default NewFormProject;