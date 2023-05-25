import { fetchData } from "../../../../api/fetch.data.ts";

const apiEndpoint = "http://localhost:3001"

export function getApiTeamMembers(id?: string) {() => fetchData(`${apiEndpoint}/api/team-members/${id}`, "GET", null).read();}
export function postApiTeamMembers(body: {}) {() => fetchData(`${apiEndpoint}/api/team-members/`, "POST", body ).read();}
export function putApiTeamMembers(id: string, body: {}) {() => fetchData(`${apiEndpoint}/api/team-members/${id}`, "PUT", body ).read();}
export function deleteApiTeamMembers(id: string) {() => fetchData(`${apiEndpoint}/api/team-members/${id}`, "DELETE", null).read();}