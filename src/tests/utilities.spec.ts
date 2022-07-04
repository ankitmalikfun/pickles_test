import { isString, isValidObjectId, isObject, isValidArrayOfStrings, getEnumKeyOrValue, isEmpty } from './../libs/utilities';
import { mockUtility, StatusCodes } from './mocks/utilityMock';
import { commonValidations } from '../controllers/commonValidations';


describe("Functional testing", () => {

  it(`Returns true if a valid object id is tested`, () => {
    const result = isValidObjectId(mockUtility.objectId);
    expect(result).toBe(true);
  });

  it(`Returns true if a valid string is tested`, () => {
    const result = isString(mockUtility.validString);
    expect(result).toBe(true);
  });

  it(`Returns true if a valid object is tested`, () => {
    const result = isObject(mockUtility);
    expect(result).toBe(true);
  });

  it(`Returns true if a valid array of strings is tested`, () => {
    const result = isValidArrayOfStrings(mockUtility.arrayOfStrings);
    expect(result).toBe(true);
  });
  it(`check the commonValidations `, () => {
    const result = commonValidations.stringValidation(mockUtility.validString, mockUtility.validString);
    // expect(result).toBe({});s
  });

  it(`Returns true if a valid array of strings is tested`, () => {
    const result = getEnumKeyOrValue(StatusCodes, StatusCodes.OK);
    expect(result).toBe("OK");
  });

  it(`Returns false if emptiness of something is tested`, () => {
    const result = isEmpty(mockUtility.validString);
    expect(result).toBe(false);
  });

  it(`Returns false if value = 0`, () => {
    const result = isEmpty(mockUtility.zero);
    expect(result).toBe(false);
  });

  it(`Returns false if a numeric value is tested`, () => {
    const result = isEmpty(mockUtility.validNumber);
    expect(result).toBe(false);
  });
});
