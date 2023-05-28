import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { UsersApiClient, UserProfilesApiClient } from "../../../api/fetch.functions.ts"
import { useStateContext } from "../../../contexts/dashboard/ContextProvider.jsx"

const FormUserProfile = ({disabled}) => {
    const { setUserByEmail, setCurrentUser, currentUser } = useStateContext();
    console.log('currentUser: ', currentUser);

    const [userProfile, setUserProfile] = useState(undefined)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [bio, setBio] = useState('')
    const [isPending, setIsPending] = useState(false)
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    //             // Get User Profile from API
    //             const idUser = user._id;
    //             const user = await UsersApiClient.getUserReferences(idUser);
    //             // const apiUser = await fetch(`http://localhost:3001/api/users/${idUser}`);
    //             console.log('user :', user)
    //             // Get User Profile from API
    //             let userProfileApi;
    //             if (user) {
    //                 userProfileApi = getUserProfile(user);
    //             }
    //             setUserProfile(userProfileApi);
    //             console.log('user: ', user)
    //             console.log('userProfile: ', userProfile)
    //         } catch (error) {
    //             console.log("Error charging data:", error);
    //         }
    //     }
    //     fetchData().catch(console.error);
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
                // Update currentUser in React State
                if (currentUser?.email) {
                    await setCurrentUser(currentUser?.email)
                }
                // Get User Profile from currentUser
                let userProfileApi;
                if (currentUser) {
                    userProfileApi = getUserProfile(currentUser);
                }
                setUserProfile(userProfileApi);
                console.log('currentUser: ', currentUser)
                console.log('userProfile: ', userProfile)
            } catch (error) {
                console.log("Error charging data:", error);
            }
        }
        fetchData().catch(console.error);
    }, []);

    
    function getUserProfile(user) {
        let profile = {
            user: user._id,
            firstName: firstName,
            lastName: lastName,
            bio: bio
        }
        if (user?.userProfile) {
            profile = user.userProfile; 
        }
        return profile;
    }

    async function handleSubmitUserProfile(e) {
        e.proeventDefault();
        setIsPending(true);
        const userProfileData = {
            user: user._id,
            firstName: firstName,
            lastName: lastName,
            bio: bio
        }
        
        if (userProfile?._id) {
            // Update existing User Profile
            const userProfileUpdated = await UserProfilesApiClient.putApiUserProfiles(userProfile._id, userProfileData);
        } else {
            //Create new User Profile
            const userProfileCreated = await UserProfilesApiClient.postApiUserProfiles(userProfileData);
        }

        setIsPending(false);
    }

    // Before charging data
    // if (!userProfile) {
    //     return <div>Loading...</div>;
    // }

    // After charging data
    return (
        <div className="flex flex-col w-full p-10 space-y-4 bg-white rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
            <form onSubmit={handleSubmitUserProfile}>
                <fieldset disabled={disabled}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">@</span>
                                            <input
                                                disabled="disabled"
                                                type="text"
                                                name="email"
                                                id="email"
                                                autoComplete="email"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder={currentUser?.email} />
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                        First Name
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">@</span> */}
                                            <input
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                autoComplete="firstName"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder={userProfile?.firstName} />
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                        First Name
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">@</span> */}
                                            <input
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                autoComplete="lastName"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder={userProfile?.lastName} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">
                                        About
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="bio"
                                            name="bio"
                                            rows={3}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={userProfile?.bio} />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        {disabled ?
                            <Link to="/users/edit" type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit</Link>
                            :
                            <>
                                <Link to="/users/show" type="button" className="bt text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
                                {!isPending && <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>}
                                {isPending && <button disabled className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>}
                            </>}
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

export default FormUserProfile;