import { fetchData } from "../../../../api/fetch.data.ts";

const apiEndpoint = "http://localhost:3001"

export function getApiUserAccounts(id?: string) {() => fetchData(`${apiEndpoint}/api/user-accounts/${id}`, "GET", null).read();}
export function postApiUserAccounts(body: {}) {() => fetchData(`${apiEndpoint}/api/user-accounts/`, "POST", body ).read();}
export function putApiUserAccounts(id: string, body: {}) {() => fetchData(`${apiEndpoint}/api/user-accounts/${id}`, "PUT", body ).read();}
export function deleteApiUserAccounts(id: string) {() => fetchData(`${apiEndpoint}/api/user-accounts/${id}`, "DELETE", null).read();}