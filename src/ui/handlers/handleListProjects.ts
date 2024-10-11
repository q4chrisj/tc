import { createTable } from "nice-table";
import { Project, ProjectItem } from "../../model";
import { TeamCityService } from "../../services/teamcity.service";

export async function handleListProjects(): Promise<void> {
  const service = new TeamCityService();
  const project: Project = await service.getProject("_Root");
  const projectsTable = createTable<ProjectItem>(
    project.projects.project,
    ["name", "description"],
    {
      fullWidth: true,
      horizontalAlignment: "left",
    },
  );

  console.log(projectsTable);
}
