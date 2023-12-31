import { List, ListItem, ListSubheader } from "@mui/material";
import Stack from '@mui/material/Stack';
import { Diagnosis, Entry } from "../../types";
import diagnoseService from '../../services/diagnoses';
import { useEffect, useState } from "react";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcarekEntryDetails";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";
import { assertNever } from "../../utils";

interface Props {
  entries: Entry[];
}

const EntriesList = (props: Props) => {
  const entries = props.entries;

  const [diagnoses, setDiagnoses] = useState<Record<string, Diagnosis>>();

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const response = await diagnoseService.getAll();
      let diagnosisData: Record<string, Diagnosis> = {};
      for (const diagnosis of response) {
        diagnosisData[diagnosis.code] = diagnosis;
      }
      console.log(Object.values(diagnosisData).length);
      setDiagnoses(diagnosisData);
    }
    fetchDiagnoses();
  },[]);

  const getDiagnosisName = (code: string) => {
    if (!diagnoses) {
      return null;
    }
    const result = diagnoses[code];
    return result ? result.name : '<unknown diagnosis code>';
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
      {entries.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).map(e =>
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