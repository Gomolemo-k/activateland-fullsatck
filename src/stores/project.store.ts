import { atom } from "nanostores"

export const userProjects = atom([]);
export const project = atom([]);

// export function addUserProjects(userProjects: any) {
//     userProjects.set([...userProjects.get(), userProjects]); // Save multiple objects
//     console.log('nanostores/userProjects: ', userProjects.get());
// }


// export function addProjects(project: any) {
//     project.set([...project.get(), project]); // Save multiple objects
//     console.log('nanostores/project: ', project.get());
// }
