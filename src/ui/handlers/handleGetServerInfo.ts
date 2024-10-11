import { createTable } from "nice-table";
import { TeamCityService } from "../../services/teamcity.service";
import { Server } from "../../model";

export async function handleGetServerInfo(): Promise<void> {
  const teamCityService = new TeamCityService();
  const server = await teamCityService.getServer();

  const servers = [server];

  const table = createTable<Server>(servers, ["version", "role", "webUrl"], {
    fullWidth: true,
    horizontalAlignment: "left",
  });

  console.log(table);
}
