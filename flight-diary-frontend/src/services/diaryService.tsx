import axios from 'axios';
import { NonSensitiveDiaryEntry } from "../../../flight-diary/src/types";

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaryEntries = () => {
  return axios.get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(response => response.data);
};
