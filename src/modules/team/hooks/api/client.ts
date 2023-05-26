import { fetchData } from "../../../../api/fetch.data.ts";

const apiEndpoint = "http://localhost:3001"

export function getApiTeams(id?: string) {() => fetchData(`${apiEndpoint}/api/teams/${id}`, "GET", null).read();}
export function postApiTeams(body: {}) {() => fetchData(`${apiEndpoint}/api/teams/`, "POST", body ).read();}
export function putApiTeams(id: string, body: {}) {() => fetchData(`${apiEndpoint}/api/teams/${id}`, "PUT", body ).read();}
export function deleteApiTeams(id: string) {() => fetchData(`${apiEndpoint}/api/teams/${id}`, "DELETE", null).read();}

export function getApiTeamReferences(id?: string) {() => fetchData(`${apiEndpoint}/api/team-refernces/${id}`, "GET", null).read();}