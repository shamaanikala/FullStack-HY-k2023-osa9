export const getEnumValues = (enumObject: unknown): string[] => {
  if(!enumObject || typeof enumObject !== 'object') {
    throw new Error('Invalid enumObject');
  }

  const values: string[] = Object.values(enumObject);
  return values;
}