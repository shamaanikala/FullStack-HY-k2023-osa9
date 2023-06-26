export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseStringParam = (fieldName: string, field: unknown): string => {
  if (!isString(field)) {
    throw new Error(`Incorrect or missing ${fieldName}`);
  } 

  return field;
};