// renders the names of the different parts and exercises
import { ContentProp } from "../types";

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