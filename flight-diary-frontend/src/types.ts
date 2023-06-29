export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

export interface DiaryEntryProp {
  entry: DiaryEntry;
}

export interface NewDiaryEntryFormProps {
  // function inside interface as a type
  // https://stackoverflow.com/questions/34560182/typescript-interface-with-function?rq=3
  idGenerator(): number;
}

export interface DiaryEntryFormErrorMessageProps {
  message: string;
}

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface EnumRadioButtonsProps {
  name: string;
  enumObject: Weather | Visibility;
}

export interface RadioButtonProps {
  name: string;
}

export interface VisibilityRadioButtonsProps {
  handleVisibility(value: string): void;
}

export interface WeatherRadioButtonsProps {
  handleWeather(value: string): void;
}