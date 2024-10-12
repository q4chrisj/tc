import { cacheable } from "../decorators/cache.decorator";
import { BuildType, Builds, Project, ProjectItems, Server } from "../model";
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

  getBuilds = async () => {
    return await get<Builds>(`/builds`).then((response) => {
      return response;
    });
  };

  getRunningBuilds = async (count: number) => {
    const url =
      count > 0
        ? `/builds?locator=state:running,count:${count}`
        : `/builds?locator=state:running`;

    return await get<Builds>(url).then((response) => {
      return response;
    });
  };

  @(cacheable<Server>)
  public async getServer(): Promise<Server> {
    return await get<Server>(`/server`).then((response) => {
      return response;
    });
  }
}
