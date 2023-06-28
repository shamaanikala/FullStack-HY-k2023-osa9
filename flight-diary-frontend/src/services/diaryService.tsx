import axios from 'axios';
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "../../../flight-diary/src/types";

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaryEntries = () => {
  return axios.get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(response => response.data);
};

export const createDiaryEntry = (object: NewDiaryEntry) => {
  return axios
    .post<NewDiaryEntry>(baseUrl, object)
    .then(response => response.data);
};
