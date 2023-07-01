import { List, ListItem, ListSubheader } from "@mui/material";
import Stack from '@mui/material/Stack';
import { Diagnosis, Entry } from "../../types";
import diagnoseService from '../../services/diagnoses';
import { useEffect, useState } from "react";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcarekEntryDetails";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";

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

  interface EntryDetailProps {
    entry: Entry;
  }

  const EntryDetails = ({ entry }: EntryDetailProps) => {
    switch (entry.type) {
      case "OccupationalHealthcare":
        return (
        <OccupationalHealthcareEntryDetails
          entry={entry}
          diagnoses={diagnoses}
          getDiagnosisName={getDiagnosisName}
        />)
      case "HealthCheck":
        return (
        <HealthCheckEntryDetails
          entry={entry}
          diagnoses={diagnoses}
          getDiagnosisName={getDiagnosisName}
        />);
      case "Hospital":
        return (
          <HospitalEntryDetails
            entry={entry}
            diagnoses={diagnoses}
            getDiagnosisName={getDiagnosisName}
          />);
      default:
        return assertNever(entry);
    }
  };

  return (
    <>
    <List subheader={<ListSubheader><h3>entries</h3></ListSubheader>}>
      {entries.length === 0 && <div><i>No entries.</i></div>}
      {entries.map(e =>
        <ListItem key={e.id}>
          <Stack>
            <EntryDetails entry={e} />
          </Stack>
        </ListItem>
      )}
    </List>
  </>
  );
};

export default EntriesList;