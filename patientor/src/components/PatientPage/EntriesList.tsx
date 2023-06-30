import { List, ListItem, ListItemText, ListSubheader } from "@mui/material";
import { Entry } from "../../types";

interface Props {
  entries: Entry[];
}

const EntriesList = (props: Props) => {
  console.log(props.entries);
  const entries = props.entries;
  return (
    <List subheader={<ListSubheader><h3>entries</h3></ListSubheader>}>
      {entries.map(e =>
        <ListItem key={e.id}>
          <ListItemText> {e.date} <i>{e.description}</i></ListItemText>
        </ListItem>
      )}
    </List>
  );
};

export default EntriesList;