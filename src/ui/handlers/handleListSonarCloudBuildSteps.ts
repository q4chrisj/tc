import { createTable } from "nice-table";
import { TeamCityService } from "../../services/teamcity.service";
import { Project, ProjectItems } from "../../model";

type SonarCloudStep = {
  project: string;
  stepName: string;
  stepId: string;
};

export async function handleListSonarCloudBuildSteps(): Promise<void> {
  const service = new TeamCityService();

  const projectItems: ProjectItems = await service.getProjects();
  let sonarCloudSteps: number = 0;

  console.log(`Finding all sonar cloud steps...`);
  const steps = [] as SonarCloudStep[];
  for (const projectItem of projectItems.project) {
    const project: Project = await service.getProject(projectItem.id);

    for (const buildType of project.buildTypes.buildType) {
      const build = await service.getBuildTypes(buildType.id);

      for (const step of build.steps.step) {
        if (step.name.toLowerCase().includes("sonar")) {
          steps.push({
            project: project.parentProjectId,
            stepName: step.name,
            stepId: step.id,
          });
          sonarCloudSteps++;
        }
      }
    }
  }

  const table = createTable<SonarCloudStep>(
    steps,
    ["project", "stepName", "stepId"],
    {
      fullWidth: true,
      horizontalAlignment: "left",
    },
  );

  console.log(table);

  console.log(`Number of Sonar Cloud steps: ${sonarCloudSteps}`);
}
