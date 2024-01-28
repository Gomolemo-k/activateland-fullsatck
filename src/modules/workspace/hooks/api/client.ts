import { fetchData } from "../../../../api/fetch.data.ts";

const apiEndpoint = "http://localhost:3001";

export async function getApiWorkspaces(id?: string) { return await fetchData(`${apiEndpoint}/api/workspaces/${id}`, "GET", null); }
export async function getApiWorkspacesByUser(userId?: string) { return await fetchData(`${apiEndpoint}/api/workspaces-user/${userId}`, "GET", null); }
export async function postApiWorkspaces(body: {}) { return await fetchData(`${apiEndpoint}/api/workspaces/`, "POST", body); }
export async function putApiWorkspaces(id: string, body: {}) { return await fetchData(`${apiEndpoint}/api/workspaces/${id}`, "PUT", body); }
export async function deleteApiWorkspaces(id: string) { return await fetchData(`${apiEndpoint}/api/workspaces/${id}`, "DELETE", null); }

export async function getApiWorkspaceReferences(id: string) { return await fetchData(`${apiEndpoint}/api/workspace-references/${id}`, "GET", null).read(); }
