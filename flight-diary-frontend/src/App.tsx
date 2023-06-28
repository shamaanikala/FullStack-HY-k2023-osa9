import { useEffect, useState } from "react";
import axios from "axios";
import DiaryEntry from "./components/DiaryEntry";
import { NonSensitiveDiaryEntry } from "../../flight-diary/src/types";

const App = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    axios.get<NonSensitiveDiaryEntry[]>('http://localhost:3001/api/diaries')
      .then(response => {
        setEntries(response.data);
      });
  }, []);

  return (
    <div>
      <h2>Flight Diary</h2>
      <div>
        <h2>Diary entries</h2>
        {entries.map(entry => <DiaryEntry key={entry.id} entry={entry} />)}
      </div>
    </div>
  );
};

export default App;
