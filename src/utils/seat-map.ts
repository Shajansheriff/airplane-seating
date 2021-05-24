import { isInteger } from 'lodash';

export const isValidDimension = (arr: any): boolean => {
  const isArray = Array.isArray(arr);
  if (!isArray) {
    return false;
  }
  return arr.length === 2 && isInteger(arr[0]) && isInteger(arr[1]);
};

export const isValidTwoDimensionalArray = (input: any): boolean => {
  const isArray = Array.isArray(input);
  if (!isArray) {
    return false;
  }
  return input.every((item) => {
    return isValidDimension(item);
  });
};

export const parseString = (string: string): any | string => {
  try {
    return JSON.parse(string);
  } catch {
    return string;
  }
};
