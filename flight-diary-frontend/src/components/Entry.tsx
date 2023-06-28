import { DiaryEntryProp } from "../types";
import { NonSensitiveDiaryEntry } from '../../../flight-diary/src/types';

const DiaryEntry = (props: DiaryEntryProp) => {
  const entry: NonSensitiveDiaryEntry = props.entry;
  return (
    <div>
      <h3>{entry.date}</h3>
        <p>
          visibility: {entry.visibility}<br />
          weather: {entry.weather}
        </p>
    </div>
  );
};

export default DiaryEntry;