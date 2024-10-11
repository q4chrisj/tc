export type Builds = {
  count: number;
  href: string;
  build: Build[];
};

export type Build = {
  id: number;
  buildTypeId: string;
  number: string;
  status: string;
  state: string;
  branchName: string;
  defaultBranch: boolean;
  href: string;
  webUrl: string;
  finishOnAgentDate: string;
};

export type BuildDetails = {
  Build: Build;
};
