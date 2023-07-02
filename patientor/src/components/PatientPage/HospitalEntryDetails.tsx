import { Badge, Card, CardContent, Divider } from "@mui/material"
import { Diagnosis, HospitalEntry } from "../../types";
import DiagnoseBy from "./DiagnoseBy";
import EntryHeader from "./EntryHeader";
import EntryDescription from "./EntryDescription";
import DiagnoseDetails from "./DiagnoseDetails";
import EventNoteIcon from '@mui/icons-material/EventNote';
import DateRangeIcon from '@mui/icons-material/DateRange';

interface HospitalEntryProps {
  entry: HospitalEntry;
  diagnoses?: Record<string, Diagnosis>;
  getDiagnosisName: (code: string) => string | null;
}

const HospitalEntryDetails = (props: HospitalEntryProps) => {
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
        <DiagnoseBy specialist={e.specialist} /><br />
        <Divider textAlign='left'>Hospitalisation status</Divider>
        {e.discharge && <div><h4>Discharged</h4>
          <span title="Date"><Badge><DateRangeIcon /></Badge>{" "}{e.discharge.date}</span><br />
          <span title="Criteria"><Badge><EventNoteIcon /></Badge>{" "}{e.discharge.criteria}</span>
        </div>}
        {!e.discharge && <div><h4>Hospitalised</h4>
          <span><i>Since:</i>{" "}{e.date}</span>
        </div>}
      </CardContent>
    </Card>
  );
};

export default HospitalEntryDetails;