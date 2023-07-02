import { Avatar, Badge, CardHeader, Typography } from "@mui/material";
import { Entry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import { assertNever } from "../../utils";
import red from "@mui/material/colors/red";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import amber from "@mui/material/colors/amber";

interface OccupationalHeaderProps {
  entry: OccupationalHealthcareEntry;
}

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

const OccupationalEntryHeader = ({ entry }: OccupationalHeaderProps) => {
  return (
    <CardHeader
        avatar={
          <Badge color="primary">
          <Avatar title="Occupational healthcare" sx={{ bgcolor: amber[300] }}>
            <MedicalInformationIcon />
          </Avatar>
          </Badge>}
        title={entry.date}
        subheader={<EmployerIcon name={entry.employerName} />}
      /> 
  );
};

interface HospitalHeaderProps {
  entry: HospitalEntry;
}
const HospitalEntryHeader = ({ entry }: HospitalHeaderProps) => {
  // badge is probably needed to get the icon working
  return (
    <>
      <CardHeader
        avatar={
          <Badge color="primary">
            <Avatar title="Hospital" sx={{ bgcolor: red[400]}}>
              <LocalHospitalIcon />
            </Avatar>
          </Badge>}
        title={entry.date}
        subheader={entry.discharge ? `Discharged: ${entry.discharge.date}` : 'Currently hospitalised'}
      />
    </>
  );
};

const HealthCheckEntryHeader = () => {
  return (
    <div>
      Health Check Entry Header
    </div>
  );
};

interface EntryHeaderProps {
  entry: Entry;
}

const EntryHeader = ({ entry }: EntryHeaderProps) => {
  const type = entry.type;
  switch (type) {
    case "OccupationalHealthcare":
      return <OccupationalEntryHeader entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryHeader />;
    case "Hospital":
      return <HospitalEntryHeader entry={entry} />;
    default:
      return assertNever(entry);
  }
};

/*


<CardHeader
        avatar={
          <Badge color="primary">
          <Avatar title="Health Check" sx={{ bgcolor: lightGreen[400] }}>
            <HowToRegIcon /> 
          </Avatar>
          </Badge>}
        title={e.date}
        subheader={<HealthCheckRatingHeader rating={e.healthCheckRating} />}
      />
*/
export default EntryHeader;