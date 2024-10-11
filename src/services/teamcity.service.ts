import { BuildType, Builds, Project, ProjectItems, Server } from "../model";
import { CacheService } from "./cache.service";
import { get } from "./http.service";

export class TeamCityService {
  private _cacheService: CacheService = new CacheService();

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

  getServer = async () => {
    const cacheData = await this._cacheService.get<Server>("server");
    if (cacheData) {
      return cacheData;
    }

    const response = await get<Server>(`/server`).then((response) => {
      return response;
    });

    await this._cacheService.set("server", response);

    return response;
  };
}
