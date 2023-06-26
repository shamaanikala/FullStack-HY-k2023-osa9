// renders the total sum of exercises in all parts
import { ContentProp, CoursePart } from "../types";

const Total = (props: ContentProp) => {
  const courseParts: CoursePart[] = props.parts;

  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
