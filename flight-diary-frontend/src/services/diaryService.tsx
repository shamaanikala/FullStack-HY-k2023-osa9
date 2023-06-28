import axios from 'axios';
import { DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaryEntries = () => {
  return axios.get<DiaryEntry[]>(baseUrl)
    .then(response => response.data);
};

// Ex9.18 leave the validation to backend only
export const createDiaryEntry = async (object: unknown) => {
  try {
    const response = await axios.post(baseUrl, object);
    return response.data;
  } catch(error) {
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
