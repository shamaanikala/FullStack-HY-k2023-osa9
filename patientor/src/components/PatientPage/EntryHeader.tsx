import { Avatar, Badge, CardHeader, Typography } from "@mui/material";
import { Entry, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import { assertNever } from "../../utils";
import red from "@mui/material/colors/red";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import amber from "@mui/material/colors/amber";
import green from "@mui/material/colors/green";
import blue from "@mui/material/colors/blue";
import blueGrey from "@mui/material/colors/blueGrey";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import lightGreen from "@mui/material/colors/lightGreen";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

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

interface DischargeProp {
  date: string;
}

const DischargeIcon = ({ date }: DischargeProp) => {
  return (
    <Typography title="Discharged">
      <Badge><LogoutIcon /></Badge>
      <span>{" "}<small>{date}</small></span>
    </Typography>
  );
};

interface InpatientProp {
  date: string;
}

const InpatientIcon = ({ date }: InpatientProp) => {
  return (
    <Typography title="Hospitalised">
      <Badge><LoginIcon /></Badge>
      <span>{" "}<small>{date}</small></span>
    </Typography>
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
        subheader={
          entry.discharge
            ? <DischargeIcon date={entry.discharge.date} />
            : <InpatientIcon date={entry.date} />
          }
      />
    </>
  );
};

/**
 * HealthCheck Rating colors
 * 0 - healty - ??
 * 1 - low risk -
 * 2 - high risk - 
 * 3 - critical risk - black?
 * 
 * Use also badge icons?
 * tooltip to show to legend of colors and values
 */

interface HealthCheckRatingProp {
  rating: HealthCheckRating;
} 

// Ex9.29 change the colours:
// blueGery[900] is almost black -> CriticalRisk
// The traffic light analogy could be informative,
// but the red colour as worst can be misleading
// as red heart can be considered as a symbol of health.
// Let's not use red at all but a range of colours
// from green to blue to very dark blue that is almost black
// Let's not use red, as red heart 
// { color: red[500], description: 'Critical Risk' },
const healthRatingInformation = [
  { color: green[300], description: 'Healthy' },
  { color: blue[400], description: 'Low Risk' },
  { color: blueGrey[400], description: 'High Risk' },
  { color: blueGrey[900], description: 'Critical Risk'}
];

const HealthCheckRatingHeader = ({ rating }: HealthCheckRatingProp) => {
  return (
    <div title={`Health Rating: ${healthRatingInformation[rating].description}`}>
      <FavoriteIcon sx={{ color: healthRatingInformation[rating].color }} />
    </div>
  );
};


interface HealthCheckHeaderProps {
  entry: HealthCheckEntry;
}
const HealthCheckEntryHeader = ({ entry }: HealthCheckHeaderProps) => {
  return (
  <CardHeader
      avatar={
        <Badge color="primary">
        <Avatar title="Health Check" sx={{ bgcolor: lightGreen[400] }}>
          <HowToRegIcon /> 
          </Avatar>
          </Badge>}
        title={entry.date}
        subheader={<HealthCheckRatingHeader rating={entry.healthCheckRating} />}
      />
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
      return <HealthCheckEntryHeader entry={entry} />;
    case "Hospital":
      return <HospitalEntryHeader entry={entry} />;
    default:
      return assertNever(entry);
  }
};

/*



*/
export default EntryHeader;