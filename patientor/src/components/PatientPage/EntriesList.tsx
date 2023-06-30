import { List, ListSubheader } from "@mui/material";
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
        <ListSubheader>{e.date}</ListSubheader>
      )}
    </List>
  );
};

export default EntriesList;