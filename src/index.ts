#!/usr/bin/env node

// https://blog.logrocket.com/building-typescript-cli-node-js-commander/

import { CLI } from "./ui/cli";
import { config } from "./config";

async function run(): Promise<void> {
  if (!config.TeamCityUri || !config.TeamCityToken) {
    console.error(
      "Please set the TEAM_CITY_URI and TEAM_CITY_TOKEN environment variables.",
    );
    return;
  }

  const cli = new CLI();
  cli.run();
}

run();
