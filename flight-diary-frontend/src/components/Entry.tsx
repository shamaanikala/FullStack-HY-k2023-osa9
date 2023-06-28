import { DiaryEntry, DiaryEntryProp } from "../types";

const Entry = (props: DiaryEntryProp) => {
  const entry: DiaryEntry = props.entry;
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

export default Entry;