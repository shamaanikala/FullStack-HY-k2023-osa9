import React, { useState } from "react";
import { createDiaryEntry } from "../services/diaryService";
import { NewDiaryEntryFormProps } from "../types";
import DiaryEntryFormErrorMessage from "./DiaryEntryFormError";
// import { NewDiaryEntry } from "../../../flight-diary/src/types";

// import utils.ts from backend
// can't import this like this: Module not found Error
// copy the backend file to this project
// Ex9.18 trust the backend for validation
// import toNewDiaryEntry from '../utils';

const DiaryEntryForm = (props: NewDiaryEntryFormProps) => {
  // state as strings, "cast" to types in addNewDiaryEntry
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const addNewDiaryEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    
    // Ex9.18 it seems these validations are
    // left to the backend only
    // const newDiaryEntry: NewDiaryEntry = toNewDiaryEntry({
    //   date,
    //   visibility,
    //   weather,
    //   comment,      
    // });
    const newDiaryEntry = {
      date,
      visibility,
      weather,
      comment,      
    };

    createDiaryEntry({
      ...newDiaryEntry,
      id: props.idGenerator()
    });

    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <div>
        <form onSubmit={addNewDiaryEntry}>
          <div>
            <DiaryEntryFormErrorMessage />
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