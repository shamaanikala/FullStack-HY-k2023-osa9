export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseStringParam = (fieldName: string, field: unknown, required=false): string => {
  if (!isString(field)) {
    throw new Error(`Incorrect or missing ${fieldName}`);
  /**
   * if required === true, then the string can't be of length zero
   */
  }
  if (required && field.length === 0) {
    throw new Error(`${fieldName} field is required (lenght is zero)`);
  }

  return field;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
