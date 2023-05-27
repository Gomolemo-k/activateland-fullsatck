import { fetchData } from "../../../../api/fetch.data.ts";

const apiEndpoint = "http://localhost:3001"

export async function getApiTeamMembers(id?: string) {return await fetchData(`${apiEndpoint}/api/team-members/${id}`, "GET", null)}
export async function postApiTeamMembers(body: {}) {return await fetchData(`${apiEndpoint}/api/team-members/`, "POST", body )}
export async function putApiTeamMembers(id: string, body: {}) {return await fetchData(`${apiEndpoint}/api/team-members/${id}`, "PUT", body )}
export async function deleteApiTeamMembers(id: string) {return await fetchData(`${apiEndpoint}/api/team-members/${id}`, "DELETE", null)}