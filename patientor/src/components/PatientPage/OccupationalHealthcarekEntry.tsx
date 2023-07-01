import { Avatar, Card, CardHeader, ListItemText } from "@mui/material"
import { Diagnosis, Entry } from "../../types";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

interface OccupationalEntryProps {
  entry: Entry;
  diagnoses?: Record<string, Diagnosis>;
  getDiagnosisName: (code: string) => string | null;
}

const OccupationalHealthcareEntry = (props: OccupationalEntryProps) => {
  const e = props.entry;
  const diagnoses = props.diagnoses;
  const getDiagnosisName = props.getDiagnosisName;

  console.log('OccupationalEnrty');

  return (
    <Card>
      <CardHeader
        avatar={<Avatar title="Occupational healthcare"><MedicalInformationIcon /></Avatar>}
        title={e.date}
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

export default OccupationalHealthcareEntry;