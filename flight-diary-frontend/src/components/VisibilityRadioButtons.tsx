import { Visibility, VisibilityRadioButtonsProps } from "../types";
import { getEnumValues } from "../utils";

const VisibilityRadioButtons = (props: VisibilityRadioButtonsProps) => {
    const name = 'visibility';
    const enumObject = Visibility;
    const values = getEnumValues(enumObject); 
    return (
      <>
        {values.map(v =>
          <span key={v}>
            <label key={`${v}-label`} htmlFor={v}>{v}</label>
            <input
              type="radio"
              id={v}
              name={name}
              onChange={() => props.handleVisibility(v)} />
          </span>
        )}
      </>
    );
  };

  export default VisibilityRadioButtons;