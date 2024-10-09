#!/usr/bin/env node

// https://blog.logrocket.com/building-typescript-cli-node-js-commander/

import { SonarCloudRemovalService } from "./services/sonarcloud-removal.service";

async function run(): Promise<void> {
  const sonarCloudRemovalService = new SonarCloudRemovalService();

  await sonarCloudRemovalService.findSonarCloudSteps();
}

run();
