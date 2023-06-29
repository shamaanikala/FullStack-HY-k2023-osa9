import { useEffect, useState } from "react";
import Entry from "./components/Entry";
import { DiaryEntry } from "./types";
import { getAllDiaryEntries } from "./services/diaryService";
import DiaryEntryForm from "./components/DiaryEntryForm";
import axios from "axios";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaryEntries().then(data => setEntries(data))
  }, []);

  const generateNewId = (entries: DiaryEntry[]): number => {
    return Math.max(...entries.map(d => d.id)) + 1;
  };

  const idGenerator = () => generateNewId(entries);

  const updateEntries = async () => {
    try {
      const response = await getAllDiaryEntries();
      setEntries(response); // returns .data in the service
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else if (error instanceof Error) {
        throw error;
      } else {
        console.error(error);
        throw new Error('Unknown error');
      }
    }
  };

  return (
    <div>
      <h2>Flight Diary</h2>
      <div>
        <DiaryEntryForm updateEntries={updateEntries} idGenerator={idGenerator} />
      </div>
      <div>
        <h2>Diary entries</h2>
        {entries.map(entry => <Entry key={entry.id} entry={entry} />)}
      </div>
    </div>
  );
};

export default App;
