import { CoursePart, PartProp } from "../types";

/**
 * Helper function from
 * Full Stack Open Part9 material:
 * for exhaustive type checking
 */

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// part.name and part.exerciseCount
// are shared by all part types and therefore
// the "main" return of the component will render them
// and this will return the variable part
const handlePartVariableFields = (part: CoursePart) => {
  switch (part.kind) {
    case "basic":
      console.log('basic part');
      return <i>{part.description}</i>;
    case "group":
      console.log('group part');
      return <span>project exercises {part.groupProjectCount}</span>;
    case "background":
      console.log('background part');
      return (
        <>
          <i>{part.description}</i><br />
          <span>background material: {part.backgroundMaterial}</span>
        </>
      );
    case "special":
      console.log('special');
      return (
        <>
          <i>{part.description}</i><br />
          <span>
            required skills:{" "}
            {part.requirements.join(', ')} 
          </span>
        </>
      );
    default:
      return assertNever(part);
  }
};

const Part = (props: PartProp) => {
  console.log(props);
  const part = props.part;
  return (
    <>
      <p key={part.name}>
        <b>{part.name} {part.exerciseCount}</b><br />
        {handlePartVariableFields(part)}
      </p>
    </>
  );
};

export default Part;
