import { List, ListItem, ListItemText, ListSubheader } from "@mui/material";
import Stack from '@mui/material/Stack';
import { Entry } from "../../types";

interface Props {
  entries: Entry[];
}

const EntriesList = (props: Props) => {
  console.log(props.entries);
  const entries = props.entries;
  return (
    <>
    <List subheader={<ListSubheader><h3>entries</h3></ListSubheader>}>
      {entries.map(e =>
        <ListItem key={e.id}>
          <Stack>
            <ListItemText> {e.date} <i>{e.description}</i></ListItemText>
              {e.diagnosisCodes && <div><ul>
                {e.diagnosisCodes.map(dc => <li key={dc}>
                      {dc}
                    </li>
                  )}
              </ul>
            </div>}
          </Stack>
        </ListItem>
      )}
    </List>
  </>
  );
};

export default EntriesList;