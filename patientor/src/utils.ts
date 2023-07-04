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

/**
 * Generate a string in format YYYY-MM-DD
 * of current day
 */
export const todayString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // getMonth() returns zero based value
  const day = today.getDate();
  return [year, month.toString().padStart(2,'0'), day.toString().padStart(2,'0')].join('-');
}