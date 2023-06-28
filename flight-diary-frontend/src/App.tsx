import { useEffect, useState } from "react";
import Entry from "./components/Entry";
import { DiaryEntry } from "./types";
import { getAllDiaryEntries } from "./services/diaryService";
import DiaryEntryForm from "./components/DiaryEntryForm";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newEntryAdded, setNewEntryAdded] = useState(true);

  useEffect(() => {
    if (newEntryAdded) {
      getAllDiaryEntries().then(data => setEntries(data))
      setNewEntryAdded(false);
    }
  }, [newEntryAdded]);

  const generateNewId = (entries: DiaryEntry[]): number => {
    // trigger the useEffect when new id is created in child components
    setNewEntryAdded(true);
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
        {entries.map(entry => <Entry key={entry.id} entry={entry} />)}
      </div>
    </div>
  );
};

export default App;
