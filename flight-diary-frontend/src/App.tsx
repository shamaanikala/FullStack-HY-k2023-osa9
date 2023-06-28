import { useEffect, useState } from "react";
import axios from "axios";
import DiaryEntry from "./components/DiaryEntry";

const App = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/diaries')
      .then(response => {
        console.log(response.data);
      });
  }, []);

  return (
    <div>
      <h2>Flight Diary</h2>
      <DiaryEntry />
    </div>
  );
};

export default App;
