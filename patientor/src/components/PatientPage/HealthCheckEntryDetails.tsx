import { Card, CardContent, Divider, ListItemText } from "@mui/material"
import { Diagnosis, HealthCheckEntry } from "../../types";
import DiagnoseBy from "./DiagnoseBy";
import EntryHeader from "./EntryHeader";


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
        <Divider textAlign="left">description</Divider>
        <ListItemText><i>{e.description}</i></ListItemText>
              {e.diagnosisCodes && <div><ul>
                {e.diagnosisCodes.map(dc => <li key={dc}>
                      {dc} {diagnoses && getDiagnosisName(dc)}
                    </li>
                  )}
              </ul>
            </div>}
        <DiagnoseBy specialist={e.specialist} />
      </CardContent>
    </Card>
  );
};

export default HealthCheckEntryDetails;