import { fetchData } from "../../../../api/fetch.data.ts";

const apiEndpoint = "http://localhost:3001"

export function getApiUserProfiles(id?: string) {() => fetchData(`${apiEndpoint}/api/user-profiles/${id}`, "GET", null).read();}
export function postApiUserProfiles(body: {}) {() => fetchData(`${apiEndpoint}/api/user-profiles/`, "POST", body ).read();}
export function putApiUserProfiles(id: string, body: {}) {() => fetchData(`${apiEndpoint}/api/user-profiles/${id}`, "PUT", body ).read();}
export function deleteApiUserProfiles(id: string) {() => fetchData(`${apiEndpoint}/api/user-profiles/${id}`, "DELETE", null).read();}