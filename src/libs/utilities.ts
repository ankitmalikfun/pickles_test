
/****************************************************************************************
 * TYPE VALIDATIONS *
 ****************************************************************************************/

export const isValidObjectId = (id: any): boolean => new RegExp("^[0-9a-fA-F]{24}$").test(id);

// tslint:disable-next-line:max-line-length
export const isValidUUID = (uuid: string): boolean =>
  new RegExp("^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$", "i").test(uuid);
export const isValidAlphaNumeric = (value: string): boolean => new RegExp("^[a-z0-9]+$", "i").test(value);
export const isValidCharactersString = (value: string): boolean => new RegExp("^[a-zA-Z0-9]*$").test(value);
export const delayInMS = ms => new Promise(response => setTimeout(response, ms));

/**
 * Returns true if field is null, empty or 0.
 * @param str 'str' to test.
 * @returns A Function that takes the field to test
 */
export function isEmpty(val): boolean {
  if (typeof val === "string") {
    return !val || 0 === val.trim().length;
  }
  if (val === 0) {
    return false;
  }
  return !val || 0 === val.length;
}

export function uniqueValuesOfKeyFromData(data: object[], key: string) {
  if (!data || !data.length) {
    return [];
  }

  const uniqueValues = new Set();
  data.forEach((item: any) => uniqueValues.add(item[key].toUpperCase()));
  return Array.from(uniqueValues);
}

export const isObject = (item): boolean => item && typeof item === "object" && item.constructor === Object && Object.keys(item).length > 0;

export const isString = (item): boolean => {
  const requestedItem = item.trim();
  return requestedItem.length && typeof requestedItem === "string";
};

export function isValidArrayOfStrings(arr: string[]) {
  if (Array.isArray(arr) && arr.length) {
    return arr.every(item => isString(item) && isValidCharactersString(item));
  }
  return false;
}

/****************************************************************************************
 * FUNCTIONAL OPERATIONS *
 ****************************************************************************************/

/**
 * Returns string representation of the key or value of the item in the enum list.
 * @param enums Enum list.
 * @param enumKeyOrValue Key or Value in the enum list.
 * @returns A new object that has same structure as the input.
 */
export function getEnumKeyOrValue(enums: any, enumKeyOrValue: any): string {
  return enums[enumKeyOrValue];
}

export function isDuplicateObjectValues(items: any[], key: string) {
  const valueArr = items.map(item => {
    return item[key];
  });
  const isDuplicate = valueArr.some((item, index) => {
    return valueArr.indexOf(item) !== index;
  });

  return isDuplicate;
}

export function isDuplicateArrayValues(items: any[]) {
  if ([...new Set(items)].length === items.length) {
    return false;
  }
  return true;
}
