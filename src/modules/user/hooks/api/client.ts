import { fetchData } from "../../../../api/fetch.data.ts";

const apiEndpoint = "http://localhost:3001"

// Users
export function getApiUsers(id?: string) {() => fetchData(`${apiEndpoint}/api/users/${id}`, "GET", null).read();}
export function postApiUsers(body: {}) {() => fetchData(`${apiEndpoint}/api/users/`, "POST", body ).read();}
export function putApiUsers(id: string, body: {}) {() => fetchData(`${apiEndpoint}/api/users/${id}`, "PUT", body ).read();}
export function deleteApiUsers(id: string) {() => fetchData(`${apiEndpoint}/api/users/${id}`, "DELETE", null).read();}

export function getApiUserByEmail(email?: string) {() => fetchData(`${apiEndpoint}/api/user-email/${email}`, "GET", null).read();}
export function getUserReferences(id: string) {() => fetchData(`${apiEndpoint}/api/user-references/${id}`, "GET", null).read();}