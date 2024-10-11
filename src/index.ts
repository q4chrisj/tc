#!/usr/bin/env node

// https://blog.logrocket.com/building-typescript-cli-node-js-commander/

import { CLI } from "./ui/cli";

async function run(): Promise<void> {
  const cli = new CLI();
  cli.run();
}

run();
