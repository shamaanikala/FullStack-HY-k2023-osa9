import { CoursePart } from "../types";

interface PartProp {
  part: CoursePart;
}

const Part = (props: PartProp) => {
  console.log(props);
  const part = props.part;
  return (
    <>
      <p key={part.name}>
        {part.name} {part.exerciseCount}
      </p>
    </>
  );
};

export default Part;
