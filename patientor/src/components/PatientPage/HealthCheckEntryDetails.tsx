import { Avatar, Badge, Card, CardContent, CardHeader, ListItemText } from "@mui/material"
import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../../types";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import red from "@mui/material/colors/red";
import blue from "@mui/material/colors/blue";
import green from "@mui/material/colors/green";
import blueGrey from "@mui/material/colors/blueGrey";
import DiagnoseBy from "./DiagnoseBy";

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

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
  diagnoses?: Record<string, Diagnosis>;
  getDiagnosisName: (code: string) => string | null;
}

interface HealthCheckRatingProp {
  rating: HealthCheckRating;
} 

const healthRatingInformation = [
{ color: green[300], description: 'Healthy' },
{ color: blue[400], description: 'Low Risk' },
{ color: blueGrey[900], description: 'High Risk' },
{ color: red[500], description: 'Critical Risk' },
]

const HealthCheckRatingHeader = ({ rating }: HealthCheckRatingProp) => {
  return (
    <div title={`Health Rating: ${healthRatingInformation[rating].description}`}>
      <FavoriteIcon sx={{ color: healthRatingInformation[rating].color }} />
    </div>
  );
};

const HealthCheckEntryDetails = (props: HealthCheckEntryProps) => {
  const e = props.entry;
  const diagnoses = props.diagnoses;
  const getDiagnosisName = props.getDiagnosisName;

  return (
    <Card sx={{ minWidth: 600}}>
      <CardHeader
        avatar={
          <Badge color="primary">
          <Avatar title="Health Check">
            <HowToRegIcon /> 
          </Avatar>
          </Badge>}
        title={e.date}
        subheader={<HealthCheckRatingHeader rating={e.healthCheckRating} />}
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

export default HealthCheckEntryDetails;