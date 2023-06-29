// accroding to 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties#traversing_object_properties
// for ... in should be possible with Enum
// for (const vis in Visibility) {
//   console.log(vis); // works fine!
// }

// eslint dispable any, I know what I'm doing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getEnumValues = (enumObject: any): string[] => {
  const values = [];
  // for ... in loops throught the keys...
  for (const val in enumObject) {
    // some one must get the value with 
    // console.log(enumObject[val]);
    values.push(enumObject[val]);
  }
  return values;
};
