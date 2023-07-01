import { Avatar, Badge, Card, CardHeader, ListItemText } from "@mui/material"
import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import BadgeIcon from '@mui/icons-material/Badge';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

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
    <Card>
      <CardHeader
        avatar={
          <Badge color="primary" badgeContent={'Occupational'}>
          <Avatar title="Occupational healthcare">
            <MedicalInformationIcon />
          </Avatar>
          </Badge>}
        title={`${e.date} - ${e.employerName} `}
      />
      <ListItemText><i>{e.description}</i></ListItemText>
              {e.diagnosisCodes && <div><ul>
                {e.diagnosisCodes.map(dc => <li key={dc}>
                      {dc} {diagnoses && getDiagnosisName(dc)}
                    </li>
                  )}
              </ul>
            </div>}
    </Card>
  );
};

export default OccupationalHealthcareEntryDetails;