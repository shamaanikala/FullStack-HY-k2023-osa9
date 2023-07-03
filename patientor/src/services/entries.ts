import axios from "axios";
import { Entry, EntryFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const create = async (patientId: string, object: EntryFormValues) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    object
  );

  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  create
};
