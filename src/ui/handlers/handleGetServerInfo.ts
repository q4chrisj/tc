import { createTable } from "nice-table";
import { TeamCityService } from "../../services/teamcity.service";
import { Server } from "../../model";

export async function handleGetServerInfo(): Promise<void> {
  const teamCityService = new TeamCityService();
  const server: Server = await teamCityService.getServer();
  const table = createTable<Server>([server], ["version", "role", "webUrl"], {
    fullWidth: true,
    horizontalAlignment: "left",
  });

  console.log(table);
}
