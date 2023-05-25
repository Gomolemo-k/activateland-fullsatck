import { fetchData } from "../../../../api/fetch.data.ts";

const apiEndpoint = "http://localhost:3001"

export function getApiPropertyAnalysis(id?: string) {() => fetchData(`${apiEndpoint}/api/property-analysis/${id}`, "GET", null).read();}
export function postApiPropertyAnalysis(body: {}) {() => fetchData(`${apiEndpoint}/api/property-analysis/`, "POST", body ).read();}
export function putApiPropertyAnalysis(id: string, body: {}) {() => fetchData(`${apiEndpoint}/api/property-analysis/${id}`, "PUT", body ).read();}
export function deleteApiPropertyAnalysis(id: string) {() => fetchData(`${apiEndpoint}/api/property-analysis/${id}`, "DELETE", null).read();}