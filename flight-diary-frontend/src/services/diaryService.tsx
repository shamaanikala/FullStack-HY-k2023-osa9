import axios, { AxiosError } from 'axios';
import { DiaryEntry, NonSensitiveDiaryEntry } from "../../../flight-diary/src/types";

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaryEntries = () => {
  return axios.get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(response => response.data);
};

// export const createDiaryEntry = (object: DiaryEntry) => {
// Ex9.18 left the validation to backend only
export const createDiaryEntry = async (object: unknown) => {
  console.log('createDiaryEntry')
  try {
    const response = await axios.post(baseUrl, object);
    return response.data;
    // return axios
      // .post<DiaryEntry>(baseUrl, object)
      // .post(baseUrl, object)
      // .then(response => response.data);
  } catch(error) {
    console.log('catchissä')
    if (axios.isAxiosError(error)) {
      console.log('käytetään axios.isAxiosError');
      console.log(error)
      console.log(error.response?.data)
    }
    if (error instanceof AxiosError) {
      console.log('createDiaryEntry: ',error.message);
    }
  }
};
