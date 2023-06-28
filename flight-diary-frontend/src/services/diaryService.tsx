import axios, { AxiosError } from 'axios';
import { DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaryEntries = () => {
  return axios.get<DiaryEntry[]>(baseUrl)
    .then(response => response.data);
};

// Ex9.18 leave the validation to backend only
export const createDiaryEntry = async (object: unknown) => {
  console.log('createDiaryEntry')
  try {
    const response = await axios.post(baseUrl, object);
    return response.data;
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
