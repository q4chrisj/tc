import { Project, ProjectItems } from "../model";
import { TeamCityService } from "./teamcity.service";

export class SonarCloudRemovalService {
  findSonarCloudSteps = async () => {
    const service = new TeamCityService();

    const projectItems: ProjectItems = await service.getProjects();
    let sonarCloudSteps: number = 0;

    console.log(`Finding all sonar cloud steps...`);
    for (const projectItem of projectItems.project) {
      const project: Project = await service.getProject(projectItem.id);

      for (const buildType of project.buildTypes.buildType) {
        const build = await service.getBuildTypes(buildType.id);

        for (const step of build.steps.step) {
          if (step.name.toLowerCase().includes("sonar")) {
            console.log(
              `Found Sonar Cloud step in project: ${project.parentProjectId} -> ${project.name}. Step name: ${step.name}`,
            );
            sonarCloudSteps++;
          }
        }
      }
    }

    console.log(`Number of Sonar Cloud steps: ${sonarCloudSteps}`);
  };
}
