import { Divider } from "@mui/material";
import { Diagnosis, Entry } from "../../types";

interface DiagnoseProps {
  entry: Entry;
  diagnoses?: Record<string, Diagnosis>;
  getDiagnosisName: (code: string) => string | null;

}

const DiagnoseDetails = ({ entry, diagnoses, getDiagnosisName }: DiagnoseProps) => {
  return (
    <div>
      {entry.diagnosisCodes && <div>
          <Divider textAlign="left">Diagnoses</Divider><br />
            <ul>
              {entry.diagnosisCodes.map(dc => <li key={dc}>
                {dc} {diagnoses && getDiagnosisName(dc)}
            </li>)}
        </ul>
      </div>}
    </div>
  );
};

export default DiagnoseDetails;