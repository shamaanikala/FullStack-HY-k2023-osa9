import { NonSensitiveDiaryEntry } from '../../flight-diary/src/types';

export interface DiaryEntryProp {
  entry: NonSensitiveDiaryEntry,
}

export interface NewDiaryEntryFormProps {
  // function inside interface as a type
  // https://stackoverflow.com/questions/34560182/typescript-interface-with-function?rq=3
  // idGenerator(entries: NonSensitiveDiaryEntry[]): number; 
  idGenerator(): number;
}