import figlet from "figlet";
import { Command } from "commander";
import { handleListSonarCloudBuildSteps } from "./handleListSonarCloudBuildSteps";
import { handleShowRunningBuilds } from "./handleShowRunningBuilds";

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
