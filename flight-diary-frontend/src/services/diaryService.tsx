import axios from 'axios';
import { DiaryEntry, NonSensitiveDiaryEntry } from "../../../flight-diary/src/types";

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaryEntries = () => {
  return axios.get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(response => response.data);
};

export const createDiaryEntry = (object: DiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then(response => response.data);
};
