
/**
 * Method for finding the app codes in the request to be added or to updated
 * @param code appCode in the request
 * @param newAppCodes appcodes which needs to be created
 */
export const isAppCodeToBeAdded = (code: string, newAppCodes: string[]) => {
  return newAppCodes.indexOf(code) > -1;
};
