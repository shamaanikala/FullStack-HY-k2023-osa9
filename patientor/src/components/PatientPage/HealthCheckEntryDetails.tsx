import { Avatar, Badge, Card, CardContent, CardHeader, ListItemText } from "@mui/material"
import { Diagnosis, HealthCheckEntry } from "../../types";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
        subheader={e.healthCheckRating}
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
      <div>
        <br />diagnose by {e.specialist}
      </div>
      </CardContent>
    </Card>
  );
};

export default HealthCheckEntryDetails;