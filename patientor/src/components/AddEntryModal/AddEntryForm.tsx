import { Button, Grid, TextField } from "@mui/material";
import { EntryFormValues } from "../../types";
import { SyntheticEvent, useState } from "react";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log('Submitting add entry form');
    console.log(event);
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          placeholder="Type entry description here.."
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <Grid>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            style={{ float: "left" }}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{
              float: "right",
            }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
