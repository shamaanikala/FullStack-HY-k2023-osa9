import { HealthCheckRating } from "./types";

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const calculateAge = (dateOfBirth: string): number => {
  return (Date.now()-Date.parse(dateOfBirth))/(3600000*24*365);
};

export const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};