import { Entry } from "../../types";
import { assertNever } from "../../utils";


const OccupationalEntryHeader = () => {
  return (
    <div>
      Occupational healthcare Entry Header
    </div>
  );
};

const HospitalEntryHeader = () => {
  return (
    <div>
      Hospital Entry Header
    </div>
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
      return <OccupationalEntryHeader />;
    case "HealthCheck":
      return <HealthCheckEntryHeader />;
    case "Hospital":
      return <HospitalEntryHeader />;
    default:
      return assertNever(entry);
  }
};

/*
<CardHeader
        avatar={
          <Badge color="primary">
          <Avatar title="Hospital" sx={{ bgcolor: red[400]}}>
            <LocalHospitalIcon />
          </Avatar>
          </Badge>}
        title={e.date}
        subheader={e.discharge ? `Discharged: ${e.discharge.date}` : 'Currently hospitalised'}
      />
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