import { fetchData } from "../../../../api/fetch.data.ts";

const apiEndpoint = "http://localhost:3001"

export function getApiProperties(id?: string) {() => fetchData(`${apiEndpoint}/api/properties/${id}`, "GET", null).read();}
export function getApiPropertiesByProject(projectId?: string) {() => fetchData(`${apiEndpoint}/api/properties-project/${projectId}`, "GET", null).read();}
export function postApiProperties(body: {}) {() => fetchData(`${apiEndpoint}/api/properties/`, "POST", body ).read();}
export function putApiProperties(id: string, body: {}) {() => fetchData(`${apiEndpoint}/api/properties/${id}`, "PUT", body ).read();}
export function deleteApiProperties(id: string) {() => fetchData(`${apiEndpoint}/api/properties/${id}`, "DELETE", null).read();}

export function getApiPropertyReferences(id?: string) {() => fetchData(`${apiEndpoint}/api/property-refernces/${id}`, "GET", null).read();}