import { Weather, WeatherRadioButtonsProps } from "../types";
import { getEnumValues } from "../utils";

const WeatherRadioButtons = (props: WeatherRadioButtonsProps) => {
  const name = 'weather';
  const enumObject = Weather;
  const values = getEnumValues(enumObject); 
  return (
    <>
      {values.map(v =>
          <span key={v}>
          <label htmlFor={v}>{v}</label>
          <input
            key={v}
            type="radio"
            id={v}
            name={name}
            onChange={() => props.handleWeather(v)} />
        </span>
      )}
    </>
  );
};

export default WeatherRadioButtons;