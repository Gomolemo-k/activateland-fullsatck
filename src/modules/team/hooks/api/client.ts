import { fetchData } from "../../../../api/fetch.data.ts";

const apiEndpoint = "http://localhost:3001"

export async function getApiTeams(id?: string) {return await fetchData(`${apiEndpoint}/api/teams/${id}`, "GET", null)}
export async function postApiTeams(body: {}) {return await fetchData(`${apiEndpoint}/api/teams/`, "POST", body )}
export async function putApiTeams(id: string, body: {}) {return await fetchData(`${apiEndpoint}/api/teams/${id}`, "PUT", body )}
export async function deleteApiTeams(id: string) {return await fetchData(`${apiEndpoint}/api/teams/${id}`, "DELETE", null)}

export async function getApiTeamReferences(id?: string) {return await fetchData(`${apiEndpoint}/api/team-refernces/${id}`, "GET", null)}