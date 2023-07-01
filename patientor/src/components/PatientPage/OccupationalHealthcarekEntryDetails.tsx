import { Avatar, Badge, Card, CardContent, CardHeader, ListItemText, Typography } from "@mui/material"
import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
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

  interface EmployerProp {
    name: string;
  }
  const EmployerIcon = ({ name }: EmployerProp) => {
    return (
      <Typography title="Employer">
        <Badge><WorkOutlineIcon /></Badge>
        <span>{" "}<small>{name}</small></span>
      </Typography>
    );
  };

  return (
    <Card sx={{ minWidth: 600}}>
      <CardHeader
        avatar={
          <Badge color="primary">
          <Avatar title="Occupational healthcare">
            <MedicalInformationIcon />
          </Avatar>
          </Badge>}
        title={e.date}
        subheader={<EmployerIcon name={e.employerName} />}
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
      {e.sickLeave &&
      <div>
        <br />
        <b>Sick leave:</b> {e.sickLeave.startDate} - {e.sickLeave.endDate}<br />
      </div>}
      <div>
        <br />diagnose by {e.specialist}
      </div>
      </CardContent>
    </Card>
  );
};

export default OccupationalHealthcareEntryDetails;