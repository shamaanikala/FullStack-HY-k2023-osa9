import { Card, ListItemText } from "@mui/material"
import { Diagnosis, Entry } from "../../types";

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
      OccupationalHealthcare
      <ListItemText> {e.date} <i>{e.description}</i></ListItemText>
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