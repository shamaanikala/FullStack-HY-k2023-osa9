export interface HeaderProps {
  name: string;
}

export interface CoursePart {
  name: string;
  exerciseCount: number; 
}

// the React component has only one field 'props'
export interface ContentProp {
  parts: CoursePart[]; // define the props.parts prop
}

