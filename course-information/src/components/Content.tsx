import { ContentProp } from "../types";
import Part from "./Part";

const Content = (props: ContentProp) => {
  return (
    <div>
      {props.parts.map(p =>
        <Part key={p.name} part={p} />
      )}
    </div>
  );
};

export default Content;