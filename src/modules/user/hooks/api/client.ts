import { fetchData } from "../../../../api/fetch.data";

const apiEndpoint = "http://localhost:3001"

// Users
export async function getApiUsers(id?: string) {return await fetchData(`${apiEndpoint}/api/users/${id}`, "GET", null)}
export async function postApiUsers(body: {}) {return await fetchData(`${apiEndpoint}/api/users/`, "POST", body )}
export async function putApiUsers(id: string, body: {}) {return await fetchData(`${apiEndpoint}/api/users/${id}`, "PUT", body )}
export async function deleteApiUsers(id: string) {return await fetchData(`${apiEndpoint}/api/users/${id}`, "DELETE", null)}

export async function getApiUserByEmail(email?: string) {return await fetchData(`${apiEndpoint}/api/user-email/${email}`, "GET", null)}
export async function getUserReferences(id: string) {return await fetchData(`${apiEndpoint}/api/user-references/${id}`, "GET", null)}