export type Config = {
  TeamCityToken: string;
  TeamCityUri: string;
};

export const config: Config = {
  TeamCityUri: process.env.TEAM_CITY_URI || "",
  TeamCityToken: process.env.TEAM_CITY_TOKEN || "",
};
