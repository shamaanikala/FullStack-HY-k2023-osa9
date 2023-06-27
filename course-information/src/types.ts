export interface HeaderProps {
  name: string;
}

// export interface CoursePart {
//   name: string;
//   exerciseCount: number; 
// }

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CoursePartBase, CoursePartDescription {
  kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

export interface CoursePartBackground extends CoursePartBase, CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;


// the React component has only one field 'props'
export interface ContentProp {
  parts: CoursePart[]; // define the props.parts prop
}

export interface PartProp {
  part: CoursePart;
}
