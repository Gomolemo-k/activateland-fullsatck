import { fetchData } from "../../../../api/fetch.data.ts";

const apiEndpoint = "http://localhost:3001"

export async function getApiUserAccounts(id?: string) {return await fetchData(`${apiEndpoint}/api/user-accounts/${id}`, "GET", null)}
export async function postApiUserAccounts(body: {}) {return await fetchData(`${apiEndpoint}/api/user-accounts/`, "POST", body )}
export async function putApiUserAccounts(id: string, body: {}) {return await fetchData(`${apiEndpoint}/api/user-accounts/${id}`, "PUT", body )}
export async function deleteApiUserAccounts(id: string) {return await fetchData(`${apiEndpoint}/api/user-accounts/${id}`, "DELETE", null)}