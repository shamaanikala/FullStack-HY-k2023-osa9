import { Button, Grid, TextField } from "@mui/material";
import { EntryFormValues } from "../../types";
import { SyntheticEvent, useState } from "react";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [type, setType] = useState('Occupational Healthcare');

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
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          placeholder="Title. Lastname"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Type"
          placeholder="Select entry type"
          fullWidth
          value={'HealthCheck'}
          onChange={({ target }) => setType(target.value)}
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
