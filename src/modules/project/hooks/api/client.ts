import { fetchData } from "../../../../api/fetch.data.ts";

const apiEndpoint = "http://localhost:3001"

export async function getApiProjects(id?: string) {return await fetchData(`${apiEndpoint}/api/projects/${id}`, "GET", null)}
export async function getApiProjectsByUser(userId?: string) {return await fetchData(`${apiEndpoint}/api/projects-user/${userId}`, "GET", null)}
export async function postApiProjects(body: {}) {return await fetchData(`${apiEndpoint}/api/projects/`, "POST", body )}
export async function putApiProjects(id: string, body: {}) {return await fetchData(`${apiEndpoint}/api/projects/${id}`, "PUT", body )}
export async function deleteApiProjects(id: string) {return await fetchData(`${apiEndpoint}/api/projects/${id}`, "DELETE", null)}

export async function getApiProjectReferences(id: string) {return await fetchData(`${apiEndpoint}/api/project-references/${id}`, "GET", null).read();}
