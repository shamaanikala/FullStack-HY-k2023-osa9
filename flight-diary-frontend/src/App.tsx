import { useEffect, useState } from "react";
import DiaryEntry from "./components/DiaryEntry";
import { NonSensitiveDiaryEntry } from "../../flight-diary/src/types";
import { getAllDiaryEntries } from "./services/diaryService";
import DiaryEntryForm from "./components/DiaryEntryForm";

const App = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaryEntries().then(data => setEntries(data))
  }, []);

  const generateNewId = (entries: NonSensitiveDiaryEntry[]): number => {
    return Math.max(...entries.map(d => d.id)) + 1;
  };

  const idGenerator = () => generateNewId(entries);

  return (
    <div>
      <h2>Flight Diary</h2>
      <div>
        <DiaryEntryForm idGenerator={idGenerator} />
      </div>
      <div>
        <h2>Diary entries</h2>
        {entries.map(entry => <DiaryEntry key={entry.id} entry={entry} />)}
      </div>
    </div>
  );
};

export default App;
