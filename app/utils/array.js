// @flow
export const flattenDeep = <T>(array: T[], currentArray: T[] = []): T[] => {
  array.forEach((item) => {
    if (Array.isArray(item)) {
      return flattenDeep(item, currentArray);
    }

    return currentArray.push(item);
  });

  return currentArray;
};
