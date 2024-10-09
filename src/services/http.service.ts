import { config } from "../config";

const teamCityToken: string = config.TeamCityToken;
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${teamCityToken}`,
};

export const get = async <T>(path: string): Promise<T> => {
  const requestUri = config.TeamCityUri.concat(path);
  const response = await fetch(requestUri, {
    method: "GET",
    headers: headers,
  });

  const res: T = await response.json();

  return res;
};
