const calculateBmi = (height: number, weight: number): string =>  {
  // height in cm, weight in kg
  // BMI is calculated mass[kg]/height[m]^2
  const heightInMeters = height/100;
  const bmi = weight/(heightInMeters*heightInMeters)
  return `Calculated BMI: ${bmi}`;
}

console.log(calculateBmi(180, 74)); // should return Normal (healthy weight)