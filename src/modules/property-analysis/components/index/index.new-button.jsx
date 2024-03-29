import React from "react";
import { Link, useNavigate } from 'react-router-dom'

const IndexNewButton = (currentUser) => {
    return (
        <div>
            <div className="my-6 lg:my-12 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300">
                <div>
                    <h4 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-100">Property Analysis</h4>
                    <ul className="flex flex-col md:flex-row items-start md:items-center text-gray-600 dark:text-gray-400 text-sm mt-3">
                        <li className="flex items-center mr-4">
                            <div className="mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-paperclip" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9 l6.5 -6.5" />
                                </svg>
                            </div>
                            <span>Active</span>
                        </li>
                        <li className="flex items-center mr-4 mt-4 md:mt-0">
                            <div className="mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trending-up" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="3 17 9 11 13 15 21 7" />
                                    <polyline points="14 7 21 7 21 14" />
                                </svg>
                            </div>
                            <span> Trending</span>
                        </li>
                    </ul>
                </div>
                <div className="mt-6 md:mt-0">
                    <Link to="/property-analysis/new" type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">New</Link>
                </div>
            </div>
        </div>
    );
};
export default IndexNewButton;
