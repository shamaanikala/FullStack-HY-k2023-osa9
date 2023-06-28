import React, { useState } from "react";
import { createDiaryEntry } from "../services/diaryService";
import { NewDiaryEntryFormProps } from "../types";
import DiaryEntryFormErrorMessage from "./DiaryEntryFormError";
import axios from "axios";

const DiaryEntryForm = (props: NewDiaryEntryFormProps) => {
  // state as strings, "cast" to types in addNewDiaryEntry
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const [error, setError] = useState<string | null>(null);

  const addNewDiaryEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    
    const newDiaryEntry = {
      date,
      visibility,
      weather,
      comment,      
    };

    try {
      await createDiaryEntry({
        ...newDiaryEntry,
        id: props.idGenerator()
      });

      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');

    } catch(error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data)
        handleErrorMessage(error.response?.data);
      } else if (error instanceof Error) {
        console.error(error.message);
        handleErrorMessage(error.message);
      } else {
        console.error('Unkonwn error!');
      }
    }

    
  };

  const handleErrorMessage = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <div>
        <form onSubmit={addNewDiaryEntry}>
          <div>
            {error && <DiaryEntryFormErrorMessage message={error} />}
          </div>
          <div>
            date <input value={date} onChange={(event) => setDate(event.target.value)} />
          </div>
          <div>
            visibility <input value={visibility} onChange={(event) => setVisibility(event.target.value)} />
          </div>
          <div>
            weather <input value={weather} onChange={(event) => setWeather(event.target.value)} />
          </div>
          <div>
            comment <input value={comment} onChange={(event) => setComment(event.target.value)} />
          </div>
          <button type="submit">add</button>
        </form>
      </div>
    </div>
  );
};

export default DiaryEntryForm;