import { BuildType } from "./build-type";

export type ProjectItems = {
  count: number;
  href: string;
  project: ProjectItem[];
};

export type ProjectItem = {
  id: string;
  name: string;
  description: string;
  href: string;
  webUrl: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  parentProjectId: string;
  href: string;
  parameters: {
    property: [
      {
        name: string;
        value: string;
        inherited: boolean;
      },
    ];
  };
  projects: {
    count: number;
    project: ProjectItem[];
  };
  buildTypes: {
    count: number;
    buildType: BuildType[];
  };
};
