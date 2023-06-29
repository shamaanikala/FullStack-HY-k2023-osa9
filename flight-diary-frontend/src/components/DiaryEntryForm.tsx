import React, { useState } from "react";
import { createDiaryEntry } from "../services/diaryService";
import { RadioButtonProps, EnumRadioButtonsProps, NewDiaryEntryFormProps, Visibility, Weather } from "../types";
import DiaryEntryFormErrorMessage from "./DiaryEntryFormError";
import axios from "axios";
import VisibilityRadioButtons from "./VisibilityRadioButtons";
import WeatherRadioButtons from "./WeatherRadioButtons";

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

  const handleVisibility = (value: Visibility) => {
    setVisibility(value);
  };

  const handleWeather = (value: Weather) => {
    setWeather(value);
  };

  // console.log(Visibility === Visibility);
  // const EnumRadioButtons =(props: EnumRadioButtonsProps) => {
  //   const name = props.name;
  //   const enumObject = props.enumObject;
  //   const values = getEnumValues(enumObject); 
  //   return (
  //     <>
  //       {values.map(v =>
  //         <span key={v}>
  //           <label htmlFor={v}>{v}</label>
  //           <input
  //             type="radio"
  //             id={v}
  //             name={name}
  //             onChange={(event) => setVisibility(event.target.value)} />
  //         </span>
  //       )}
  //     </>
  //   );
  // }
  // const VisibilityRadioButtons = () => {
  //   const name = 'visibility';
  //   const enumObject = Visibility;
  //   const values = getEnumValues(enumObject); 
  //   return (
  //     <>
  //       {values.map(v =>
  //         <>
  //           <label htmlFor={v}>{v}</label>
  //           <input
  //             type="radio"
  //             key={v}
  //             id={v}
  //             name={name}
  //             onChange={() => setVisibility(v)} />
  //         </>
  //       )}
  //     </>
  //   );
  // };

  
  // const VisibilityRadioButtons = (props: RadioButtonProps) => {
  //   const name = props.name;
  //   return (
  //     <>
  //       <EnumRadioButtons name={name} enumObject={Visibility} />
  //     </>
  //   );
  // };

  // const WeatherRadioButtons = (props: RadioButtonProps) => {
  //   const enumObject = Weather;
  //   const name = props.name;
  //   return (
  //     <>
  //       <EnumRadioButtons name={name} enumObject={enumObject} />
  //     </>
  //   );
  // };

  return (
    <div>
      <h2>Add new entry</h2>
      <div>
        <form onSubmit={addNewDiaryEntry}>
          <div>
            {error && <DiaryEntryFormErrorMessage message={error} />}
          </div>
          <div>
            date <input value={date} type="date" onChange={(event) => setDate(event.target.value)} />
          </div>
          <div>
            visibility <VisibilityRadioButtons handleVisibility={handleVisibility} /> 
          </div>
          <div>
            weather <WeatherRadioButtons handleWeather={handleWeather} />
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