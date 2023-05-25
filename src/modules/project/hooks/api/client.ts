import { fetchData } from "../../../../api/fetch.data.ts";

const apiEndpoint = "http://localhost:3001"

export function getApiProjects(id?: string) {() => fetchData(`${apiEndpoint}/api/projects/${id}`, "GET", null).read();}
export function postApiProjects(body: {}) {() => fetchData(`${apiEndpoint}/api/projects/`, "POST", body ).read();}
export function putApiProjects(id: string, body: {}) {() => fetchData(`${apiEndpoint}/api/projects/${id}`, "PUT", body ).read();}
export function deleteApiProjects(id: string) {() => fetchData(`${apiEndpoint}/api/projects/${id}`, "DELETE", null).read();}