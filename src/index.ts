#!/usr/bin/env node

/*
  - https://blog.logrocket.com/creating-a-cli-tool-with-node-js/
  - https://blog.logrocket.com/building-typescript-cli-node-js-commander/
  - https://traveling-coderman.net/code/node-architecture/configuration-management/
  - https://github.com/tj/commander.js
  - https://stackoverflow.com/questions/6158933/how-is-an-http-post-request-made-in-node-js
  - https://www.digitalocean.com/community/tutorials/how-to-use-generics-in-typescript
 */

import { getConfig } from "./config/config";
import { CLI } from "./ui/cli";
import path from "path";
import os from "os";

const systemConfigPath = path.join(
  os.homedir(),
  ".config",
  "kraken",
  "kraken.config",
);
export const config = getConfig(systemConfigPath);

export enum Environment {
  PRODUCTION = "production",
  DR = "dr",
  STAGING = "staging",
}

async function run(): Promise<void> {
  const cli: CLI = new CLI();
  cli.run();
}

run();
