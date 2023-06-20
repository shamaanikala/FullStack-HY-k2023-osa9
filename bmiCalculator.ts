interface BMI {
  // Example:
  // category: 'Normal'
  // description: 'healthy weight'
  // lowerBound: 18.5
  // upperBound: 24.9
  category: string;
  description: string;
  lowerBound?: number; // These are optional as the BMIs <= 16.0 or >= 40.0
  upperBound?: number; // do not have lower or upper bounds.
};

const calculateBmi = (height: number, weight: number): string =>  {
  // [height] = cm, [weight] = kg
  // BMI is calculated mass[kg]/height[m]^2
  const heightInMeters = height/100;
  const bmi = weight/(heightInMeters*heightInMeters)
  return `Calculated BMI: ${bmi}`;
}

console.log(calculateBmi(180, 74)); // should return Normal (healthy weight)