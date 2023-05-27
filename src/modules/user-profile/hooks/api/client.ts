import { fetchData } from "../../../../api/fetch.data.ts";

const apiEndpoint = "http://localhost:3001"

export async function getApiUserProfiles(id?: string) {return await fetchData(`${apiEndpoint}/api/user-profiles/${id}`, "GET", null)}
export async function postApiUserProfiles(body: {}) {return await fetchData(`${apiEndpoint}/api/user-profiles/`, "POST", body )}
export async function putApiUserProfiles(id: string, body: {}) {return await fetchData(`${apiEndpoint}/api/user-profiles/${id}`, "PUT", body )}
export async function deleteApiUserProfiles(id: string) {return await fetchData(`${apiEndpoint}/api/user-profiles/${id}`, "DELETE", null)}