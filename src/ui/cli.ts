import figlet from "figlet";
import { Command, Argument } from "commander";
// import { handleDeployRelease } from "./handleDeployRelease";
// import { handleCreateReleaseNotes } from "./handleCreateReleaseNotes";

export class CLI {
  async run() {
    const program = new Command();
    const { version } = require("../../package.json");

    program
      .name("tc")
      .version(version)
      .description("Manage Team City from the command line.");

    program
      .command("list-projects")
      .allowExcessArguments(false)
      .description("Deploys the specified release to the target environment")
      .action(async () => {
        // execute code to list project
      });

    program.parse(process.argv);
  }
}
