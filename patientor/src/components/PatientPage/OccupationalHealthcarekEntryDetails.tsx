import { Avatar, Badge, Card, CardContent, CardHeader, Divider, ListItemText, Typography } from "@mui/material"
import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DiagnoseBy from "./DiagnoseBy";
import amber from "@mui/material/colors/amber";
import EntryHeader from "./EntryHeader";

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
          <Avatar title="Occupational healthcare" sx={{ bgcolor: amber[300] }}>
            <MedicalInformationIcon />
          </Avatar>
          </Badge>}
        title={e.date}
        subheader={<EmployerIcon name={e.employerName} />}
      />
      <EntryHeader entry={e} />
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
        <Divider textAlign="left"><i>Sick Leave</i></Divider>
        <span title="Sick leave duration"><DateRangeIcon /> {e.sickLeave.startDate} - {e.sickLeave.endDate}</span><br />
      <br />
      </div>
      }
      <DiagnoseBy specialist={e.specialist} />
    </CardContent>
  </Card>
  );
};

export default OccupationalHealthcareEntryDetails;