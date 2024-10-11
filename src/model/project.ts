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
    project: Project[];
  };
  buildTypes: {
    buildType: BuildType[];
  };
};
