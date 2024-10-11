import { createTable } from "nice-table";
import { Build, Builds } from "../model";
import { TeamCityService } from "../services/teamcity.service";

export async function handleShowRunningBuilds(options: any): Promise<void> {
  const service: TeamCityService = new TeamCityService();
  const limit: number =
    options.limit === undefined ? 0 : parseInt(options.limit);
  const builds: Builds = await service.getRunningBuilds(limit);

  if (builds.build !== undefined && builds.build.length === 0) {
    console.log("No running builds found.");
    return;
  }

  const table = createTable<Build>(
    builds.build,
    ["buildTypeId", "number", "state", "status"],
    {
      fullWidth: true,
      horizontalAlignment: "left",
    },
  );

  console.log(table);
}
