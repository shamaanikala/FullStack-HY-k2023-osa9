import { Avatar, Badge, Card, CardContent, CardHeader, ListItemText } from "@mui/material"
import { Diagnosis, HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import red from "@mui/material/colors/red";
import DiagnoseBy from "./DiagnoseBy";

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
      <CardHeader
        avatar={
          <Badge color="primary">
          <Avatar title="Hospital" sx={{ bgcolor: red[400]}}>
            <LocalHospitalIcon />
          </Avatar>
          </Badge>}
        title={e.date}
        subheader="lol"
      />
      <CardContent>
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

export default HospitalEntryDetails;