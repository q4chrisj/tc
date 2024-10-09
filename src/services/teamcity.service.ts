import { BuildType, Project, ProjectItems } from "../model";
import { get } from "./http.service";

export class TeamCityService {
  getProjects = async () => {
    return await get<ProjectItems>(`/projects`).then((response) => {
      return response;
    });
  };

  getProject = async (projectId: string) => {
    return await get<Project>(`/projects/id:${projectId}`).then((response) => {
      return response;
    });
  };

  getBuildTypes = async (buildTypeId: string) => {
    return await get<BuildType>(`/buildTypes/id:${buildTypeId}`).then(
      (response) => {
        return response;
      },
    );
  };
}
