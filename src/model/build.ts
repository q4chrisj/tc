export type BuildType = {
  id: string;
  name: string;
  settings: {
    property: Parameter[];
  };
  steps: {
    step: Step[];
  };
};

export type Parameter = {
  name: string;
  value: string;
};

export type Step = {
  name: string;
};
