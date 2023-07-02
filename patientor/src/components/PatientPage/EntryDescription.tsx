import { Divider } from "@mui/material";

interface EntryDescriptionProps {
  description: string;
}

const EntryDescription = ({ description }: EntryDescriptionProps) => {
  return (
    <div>
      <Divider></Divider> 
      <p>
        <i>{description}</i>
      </p>
    </div>
  );
};

export default EntryDescription;

/*
<ListItemText><i>{e.description}</i></ListItemText>
              {e.diagnosisCodes && <div><ul>
                {e.diagnosisCodes.map(dc => <li key={dc}>
                      {dc} {diagnoses && getDiagnosisName(dc)}
                    </li>
                  )}
              </ul>
            </div>}
*/