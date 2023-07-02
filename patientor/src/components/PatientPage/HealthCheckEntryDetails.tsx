import { Card, CardContent } from "@mui/material"
import { Diagnosis, HealthCheckEntry } from "../../types";
import DiagnoseBy from "./DiagnoseBy";
import EntryHeader from "./EntryHeader";
import EntryDescription from "./EntryDescription";
import DiagnoseDetails from "./DiagnoseDetails";


interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
  diagnoses?: Record<string, Diagnosis>;
  getDiagnosisName: (code: string) => string | null;
}

const HealthCheckEntryDetails = (props: HealthCheckEntryProps) => {
  const e = props.entry;
  const diagnoses = props.diagnoses;
  const getDiagnosisName = props.getDiagnosisName;

  return (
    <Card sx={{ minWidth: 600}}>
      <EntryHeader entry={e} />
      <CardContent>
        <EntryDescription description={e.description} />
        <DiagnoseDetails
          entry={e}
          diagnoses={diagnoses}
          getDiagnosisName={getDiagnosisName}
        />
        <DiagnoseBy specialist={e.specialist} />
      </CardContent>
    </Card>
  );
};

export default HealthCheckEntryDetails;