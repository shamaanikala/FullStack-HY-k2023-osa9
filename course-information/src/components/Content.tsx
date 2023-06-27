// renders the names of the different parts and exercises
import { ContentProp } from "../types";
import Part from "./Part";

const Content = (props: ContentProp) => {
  return (
    <div>
      {props.parts.map(p =>
      <p key={p.name}>
        {p.name} {p.exerciseCount}
      </p>)}
      <Part />
    </div>
  );
};

export default Content;