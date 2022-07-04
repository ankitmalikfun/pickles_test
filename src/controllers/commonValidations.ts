import { isValidArrayOfStrings } from "../libs/utilities";

export const commonValidations = Object.freeze({
  stringValidation(paramName, location) {
    return {
      isLength: {
        errorMessage: `${paramName} is required`,
        options: { min: 1 }
      },
      errorMessage: `${paramName} should be a string`,
      in: [location],
      isString: true
    };
  },
  arrayOfStringsValidation(paramName, location) {
    return {
      isLength: {
        errorMessage: `${paramName} is required`,
        options: { min: 1 }
      },
      errorMessage: `${paramName} should be array of string`,
      in: [location],
      isArray: true,
      custom: {
        options: (params: string[]): boolean => isValidArrayOfStrings(params),
        errorMessage: `${paramName} Bad Format!`
      }
    };
  }
});
