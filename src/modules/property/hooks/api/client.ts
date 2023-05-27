import { fetchData } from "../../../../api/fetch.data.ts";

const apiEndpoint = "http://localhost:3001"

export async function getApiProperties(id?: string) {return await fetchData(`${apiEndpoint}/api/properties/${id}`, "GET", null)}
export async function getApiPropertiesByProject(projectId?: string) {return await fetchData(`${apiEndpoint}/api/properties-project/${projectId}`, "GET", null)}
export async function postApiProperties(body: {}) {return await fetchData(`${apiEndpoint}/api/properties/`, "POST", body )}
export async function putApiProperties(id: string, body: {}) {return await fetchData(`${apiEndpoint}/api/properties/${id}`, "PUT", body )}
export async function deleteApiProperties(id: string) {return await fetchData(`${apiEndpoint}/api/properties/${id}`, "DELETE", null)}

export async function getApiPropertyReferences(id?: string) {return await fetchData(`${apiEndpoint}/api/property-refernces/${id}`, "GET", null)}