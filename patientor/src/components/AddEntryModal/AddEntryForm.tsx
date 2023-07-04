import { Button, Grid, Switch, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { EntryFormValues } from "../../types";
import { SyntheticEvent, useState } from "react";

interface Props {
  onCancel: () => void;
  onSubmit: (patientId: string, values: EntryFormValues) => void;
  patientId: string;
}

const AddEntryForm = ({ onCancel, onSubmit, patientId }: Props) => {
  const [type, setType] = useState<"HealthCheck" | "OccupationalHealthcare"  | "Hospital">();
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  // optional shared with all
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  // HealthCheck (required)
  const [healthCheckRating, setHealthCheckRating] = useState('');

  // Occupational (required)
  const [employerName, setEmployerName] = useState('');
  // Occupational (optional)
  const [sickLeave, setSickLeave] = useState(false);
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  // Hospital (optional)
  // the form switch state
  const [discharge, setDischarge] = useState(false);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log('Submitting add entry form');
    const diagnosisCodeValues = diagnosisCodes !== ''
      ? [diagnosisCodes]
      : undefined;
    
    
    onSubmit(patientId,{
      type: 'HealthCheck',
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodeValues,
      healthCheckRating: Number(healthCheckRating)
    });
  };

  const selectEntryType = (event: React.MouseEvent<HTMLElement>, typeSelection: "HealthCheck" | "OccupationalHealthcare"  | "Hospital") => {
    event.preventDefault();
    console.log(typeSelection);
    console.log(type);
    setType(typeSelection);
  };
  
  return (
    <div>
      <h2>Add new {type} entry</h2>
      <ToggleButtonGroup exclusive value={type} onChange={selectEntryType}>
        <ToggleButton value="HealthCheck">Health Check</ToggleButton>
        <ToggleButton value="OccupationalHealthcare">Occupational Healthcare</ToggleButton>
        <ToggleButton value="Hospital">Hospital</ToggleButton>
          </ToggleButtonGroup>
          <form onSubmit={addEntry}>
        {!type && <p>Type not selected</p>}
        {type && <p>Selected type: {type}</p>}
        {type && <>
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
            label="Diagnosis Codes"
            placeholder="Enter diagnosis codes separated by comma ','"
            fullWidth
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
          />

          {type === 'HealthCheck' &&
            <TextField
              label="Health Check Rating"
              placeholder="Give Health Check Rating value from 0 (Healthy) to 3 (Critical Risk)"
              fullWidth
              value={healthCheckRating}
              onChange={({ target }) => setHealthCheckRating(target.value)}
            />
          }

          {type === 'OccupationalHealthcare' &&
            <div>
              <TextField
                label="Employer name"
                placeholder="Name of the employer"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />

              Sick leave <Switch checked={sickLeave} onChange={() => setSickLeave(!sickLeave)} />
              <TextField
                disabled={!sickLeave}
                label="Sick leave start date"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={sickLeaveStart}
                onChange={({ target }) => setSickLeaveStart(target.value)}
              />
              <TextField
                disabled={!sickLeave}
                label="Sick leave end"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={sickLeaveEnd}
                onChange={({ target }) => setSickLeaveEnd(target.value)}
              />
            </div>
          }
          {type === 'Hospital' &&
            <div>
              Discharge <Switch checked={discharge} onChange={() => setDischarge(!discharge)} />
              <TextField
                disabled={!discharge}
                label="Discharge date"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
              />
              <TextField
                disabled={!discharge}
                label="Discharge criteria"
                placeholder="Discharge criteria"
                fullWidth
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
              />
            </div>
          }
      </>}

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
        {type &&
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
          </Grid>}
      </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
