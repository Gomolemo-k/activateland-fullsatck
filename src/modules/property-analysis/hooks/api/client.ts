import { fetchData } from "../../../../api/fetch.data.ts";

const apiEndpoint = "http://localhost:3001"

export async function getApiPropertyAnalysis(id?: string) {return await fetchData(`${apiEndpoint}/api/property-analysis/${id}`, "GET", null)}
export async function getApiPropertieAnalysisByProperty(propertyId?: string) {return await fetchData(`${apiEndpoint}/api/property-analisys-property/${propertyId}`, "GET", null)}
export async function postApiPropertyAnalysis(body: {}) {return await fetchData(`${apiEndpoint}/api/property-analysis/`, "POST", body )}
export async function putApiPropertyAnalysis(id: string, body: {}) {return await fetchData(`${apiEndpoint}/api/property-analysis/${id}`, "PUT", body )}
export async function deleteApiPropertyAnalysis(id: string) {return await fetchData(`${apiEndpoint}/api/property-analysis/${id}`, "DELETE", null)}