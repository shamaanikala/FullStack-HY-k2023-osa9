// renders the names of the different parts and exercises

interface CoursePart {
  name: string;
  exerciseCount: number; 
}

// the React component has only one field 'props'
interface ContentProp {
  parts: CoursePart[]; // define the props.parts prop
}

const Content = (props: ContentProp) => {
  return (
    <div>
      {props.parts.map(p =>
      <p key={p.name}>
        {p.name} {p.exerciseCount}
      </p>)}
    </div>
  );
};

export default Content;