import { Card, CardContent, Divider } from "@mui/material"
import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import DateRangeIcon from '@mui/icons-material/DateRange';
import DiagnoseBy from "./DiagnoseBy";
import EntryHeader from "./EntryHeader";
import EntryDescription from "./EntryDescription";

interface OccupationalEntryProps {
  entry: OccupationalHealthcareEntry;
  diagnoses?: Record<string, Diagnosis>;
  getDiagnosisName: (code: string) => string | null;
}

const OccupationalHealthcareEntryDetails = (props: OccupationalEntryProps) => {
  const e = props.entry;
  const diagnoses = props.diagnoses;
  const getDiagnosisName = props.getDiagnosisName;

  return (
    <Card sx={{ minWidth: 600}}>
      <EntryHeader entry={e} />
      <CardContent>
        <EntryDescription description={e.description} />
              {e.diagnosisCodes && <div><ul>
                {e.diagnosisCodes.map(dc => <li key={dc}>
                      {dc} {diagnoses && getDiagnosisName(dc)}
                    </li>
                  )}
              </ul>
            </div>}
      <DiagnoseBy specialist={e.specialist} />
      {e.sickLeave &&
      <div>
        <br />
        <Divider textAlign="left"><i>Sick Leave</i></Divider>
        <span title="Sick leave duration"><DateRangeIcon /> {e.sickLeave.startDate} - {e.sickLeave.endDate}</span><br />
      <br />
      </div>
      }
    </CardContent>
  </Card>
  );
};

export default OccupationalHealthcareEntryDetails;