import figlet from "figlet";
import { Command } from "commander";
import {
  handleGetServerInfo,
  handleListProjects,
  handleListSonarCloudBuildSteps,
  handleShowRunningBuilds,
  handleClearCache,
} from "./handlers";

export class CLI {
  async run() {
    console.log(figlet.textSync("tc"));

    const program = new Command();
    const { version } = require("../../package.json");

    program
      .name("tc")
      .version(version)
      .description("Manage Team City from the command line.");

    program
      .command("clear-cache")
      .allowExcessArguments(false)
      .description("Clears the local cache.")
      .action(async () => {
        await handleClearCache();
      });
    program
      .command("get-serverinfo")
      .allowExcessArguments(false)
      .description("Display information about team city.")
      .action(async () => {
        await handleGetServerInfo();
      });

    program
      .command("list-projects")
      .allowExcessArguments(false)
      .description("List all projects in TeamCity")
      .action(async () => {
        await handleListProjects();
      });
    program
      .command("list-sonarcloud-steps")
      .allowExcessArguments(false)
      .description("List all Sonar Cloud build steps in TeamCity")
      .action(async () => {
        await handleListSonarCloudBuildSteps();
      });

    program
      .command("show-running-builds")
      .option("-l, --limit <limit>", "Limit the number of builds to show")
      .allowExcessArguments(false)
      .description("Shows builds that are currerntly running in TeamCity")
      .action(async (options) => {
        await handleShowRunningBuilds(options);
      });

    program.parse(process.argv);
  }
}
