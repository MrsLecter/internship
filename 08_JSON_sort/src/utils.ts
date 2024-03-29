import { AxiosResponse } from "axios";

const axios = require("axios").default;

export const getPropValue = (responseObj: Object): string => {
  const stringifyData = JSON.stringify(responseObj);
  const result = stringifyData.match(/["]+isDone+[":]+[a-z]{4,5}/);

  if (result !== null) {
    const value = result[0].substring(9);
    return value[0].toUpperCase() + value.substring(1);
  }
  return "no matches found!";
};

export const getFormattedResponse = async (
  response: AxiosResponse,
): Promise<string> => {
  const isDone = getPropValue(await response.data);
  return `${response.config.url}: isDone - ${isDone}`;
};

const getPropValueReсursive = (responseObj: any): string | void => {
  const props = Object.keys(responseObj);
  if (props.includes("isDone")) {
    return responseObj.isDone;
  }
  for (const prop of props) {
    if (
      typeof responseObj[prop] === "object" &&
      !Array.isArray(responseObj[prop])
    ) {
      return getPropValueReсursive(responseObj[prop]);
    }
  }
};
