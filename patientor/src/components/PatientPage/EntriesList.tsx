import { List, ListItem, ListItemText, ListSubheader } from "@mui/material";
import Stack from '@mui/material/Stack';
import { Diagnosis, Entry } from "../../types";
import diagnoseService from '../../services/diagnoses';
import { useEffect, useState } from "react";
import OccupationalEntry from "./OccupationalEntry";

const getDiagnosis = async (code: string) => await diagnoseService.getDiagnosisByCode(code);

interface Props {
  entries: Entry[];
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntriesList = (props: Props) => {
  const entries = props.entries;

  const [diagnoses, setDiagnoses] = useState<Record<string, Diagnosis>>();

  useEffect(() => {
    const fetch = async (entries: Entry[]) => {
      let diagnoses: Record<string, Diagnosis> = {};
      for (const entry of entries) {
        if (!entry.diagnosisCodes) {
          continue;
        }
        const codes = entry.diagnosisCodes;
        for (const code of codes) {
          if (!Object.keys(diagnoses).includes(code)) {
            const diagnosis = await getDiagnosis(code);
            if (diagnosis) {
              diagnoses[code] = diagnosis;
            }
          } 
        }
      }
      setDiagnoses(diagnoses);
    }
    fetch(entries);
  },[entries]);

  const getDiagnosisName = (code: string) => {
    if (!diagnoses) {
      return null;
    }
    const result = diagnoses[code];
    return result.name;
  };

  const EntryDetails = (entry: Entry) => {
    switch (entry.type) {
      case "OccupationalHealthcare":
        return (
        <OccupationalEntry
          entry={entry}
          diagnoses={diagnoses}
          getDiagnosisName={getDiagnosisName}
        />)
      default:
        return assertNever(entry);
    }
  };

  return (
    <>
    <List subheader={<ListSubheader><h3>entries</h3></ListSubheader>}>
      {entries.map(e =>
        <ListItem key={e.id}>
          <Stack>
            {e.type === 'OccupationalHealthcare' && 
              <OccupationalEntry
                entry={e}
                diagnoses={diagnoses}
                getDiagnosisName={getDiagnosisName}
              />}
            <ListItemText> {e.date} <i>{e.description}</i></ListItemText>
              {e.diagnosisCodes && <div><ul>
                {e.diagnosisCodes.map(dc => <li key={dc}>
                      {dc} {diagnoses && getDiagnosisName(dc)}
                    </li>
                  )}
              </ul>
            </div>}
          </Stack>
        </ListItem>
      )}
    </List>
  </>
  );
};

export default EntriesList;