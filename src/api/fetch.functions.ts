import { fetchData } from "./fetch.data.ts";

const apiEndpoint = "http://localhost:3001"

// Users
export function getApiUsers(id?: string) {() => fetchData(`${apiEndpoint}/api/users/${id}`, "GET", null).read();}
export function postApiUsers(body: {}) {() => fetchData(`${apiEndpoint}/api/users/`, "POST", body ).read();}
export function putApiUsers(id: string, body: {}) {() => fetchData(`${apiEndpoint}/api/users/${id}`, "PUT", body ).read();}
export function deleteApiUsers(id: string) {() => fetchData(`${apiEndpoint}/api/users/${id}`, "DELETE", null).read();}

// UserProfiles
export function getApiUserProfiles(id?: string) {() => fetchData(`${apiEndpoint}/api/user-profiles/${id}`, "GET", null).read();}
export function postApiUserProfiles(body: {}) {() => fetchData(`${apiEndpoint}/api/user-profiles/`, "POST", body ).read();}
export function putApiUserProfiles(id: string, body: {}) {() => fetchData(`${apiEndpoint}/api/user-profiles/${id}`, "PUT", body ).read();}
export function deleteApiUserProfiles(id: string) {() => fetchData(`${apiEndpoint}/api/user-profiles/${id}`, "DELETE", null).read();}

// UserAccounts
export function getApiUserAccounts(id?: string) {() => fetchData(`${apiEndpoint}/api/user-accounts/${id}`, "GET", null).read();}
export function postApiUserAccounts(body: {}) {() => fetchData(`${apiEndpoint}/api/user-accounts/`, "POST", body ).read();}
export function putApiUserAccounts(id: string, body: {}) {() => fetchData(`${apiEndpoint}/api/user-accounts/${id}`, "PUT", body ).read();}
export function deleteApiUserAccounts(id: string) {() => fetchData(`${apiEndpoint}/api/user-accounts/${id}`, "DELETE", null).read();}

// Projects
export function getApiProjects(id?: string) {() => fetchData(`${apiEndpoint}/api/projects/${id}`, "GET", null).read();}
export function postApiProjects(body: {}) {() => fetchData(`${apiEndpoint}/api/projects/`, "POST", body ).read();}
export function putApiProjects(id: string, body: {}) {() => fetchData(`${apiEndpoint}/api/projects/${id}`, "PUT", body ).read();}
export function deleteApiProjects(id: string) {() => fetchData(`${apiEndpoint}/api/projects/${id}`, "DELETE", null).read();}

// Teams
export function getApiTeams(id?: string) {() => fetchData(`${apiEndpoint}/api/teams/${id}`, "GET", null).read();}
export function postApiTeams(body: {}) {() => fetchData(`${apiEndpoint}/api/teams/`, "POST", body ).read();}
export function putApiTeams(id: string, body: {}) {() => fetchData(`${apiEndpoint}/api/teams/${id}`, "PUT", body ).read();}
export function deleteApiTeams(id: string) {() => fetchData(`${apiEndpoint}/api/teams/${id}`, "DELETE", null).read();}

//TeamMembers
export function getApiTeamMembers(id?: string) {() => fetchData(`${apiEndpoint}/api/team-members/${id}`, "GET", null).read();}
export function postApiTeamMembers(body: {}) {() => fetchData(`${apiEndpoint}/api/team-members/`, "POST", body ).read();}
export function putApiTeamMembers(id: string, body: {}) {() => fetchData(`${apiEndpoint}/api/team-members/${id}`, "PUT", body ).read();}
export function deleteApiTeamMembers(id: string) {() => fetchData(`${apiEndpoint}/api/team-members/${id}`, "DELETE", null).read();}

// Properties
export function getApiProperties(id?: string) {() => fetchData(`${apiEndpoint}/api/properties/${id}`, "GET", null).read();}
export function postApiProperties(body: {}) {() => fetchData(`${apiEndpoint}/api/properties/`, "POST", body ).read();}
export function putApiProperties(id: string, body: {}) {() => fetchData(`${apiEndpoint}/api/properties/${id}`, "PUT", body ).read();}
export function deleteApiProperties(id: string) {() => fetchData(`${apiEndpoint}/api/properties/${id}`, "DELETE", null).read();}

// PropertyAnalysis
export function getApiPropertyAnalysis(id?: string) {() => fetchData(`${apiEndpoint}/api/property-analysis/${id}`, "GET", null).read();}
export function postApiPropertyAnalysis(body: {}) {() => fetchData(`${apiEndpoint}/api/property-analysis/`, "POST", body ).read();}
export function putApiPropertyAnalysis(id: string, body: {}) {() => fetchData(`${apiEndpoint}/api/property-analysis/${id}`, "PUT", body ).read();}
export function deleteApiPropertyAnalysis(id: string) {() => fetchData(`${apiEndpoint}/api/property-analysis/${id}`, "DELETE", null).read();}
