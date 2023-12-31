import { Box, Button, Checkbox, Chip, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select, Switch, TextField, ToggleButton, ToggleButtonGroup, } from "@mui/material";
import { Diagnosis, EntryFormValues } from "../../types";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { todayString } from "../../utils";
import diagnoseService from '../../services/diagnoses';
import HealthCheckFormElements from "./HealthCheckFormElements";

interface Props {
  onCancel: () => void;
  onSubmit: (patientId: string, values: EntryFormValues) => void;
  patientId: string;
}

const AddEntryForm = ({ onCancel, onSubmit, patientId }: Props) => {
  const [type, setType] = useState<"HealthCheck" | "OccupationalHealthcare"  | "Hospital">();
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(todayString());
  const [specialist, setSpecialist] = useState('');

  // optional shared with all
  // Must use ([]) as initial state for MUI <Select multiple>
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);

  // HealthCheck (required)
  const [healthCheckRating, setHealthCheckRating] = useState<number | null>(null);

  // Occupational (required)
  const [employerName, setEmployerName] = useState('');
  // Occupational (optional)
  const [sickLeave, setSickLeave] = useState(false);
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  // Hospital (optional)
  const [discharge, setDischarge] = useState(false); // the form switch state
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const [diagnosisCodeData, setDiagnosisCodeData] = useState<Record<string, Diagnosis>>();

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const response = await diagnoseService.getAll();
      let diagnosisData: Record<string, Diagnosis> = {};
      for (const diagnosis of response) {
        diagnosisData[diagnosis.code] = diagnosis;
      }
      setDiagnosisCodeData(diagnosisData);
    }
    fetchDiagnoses();
  },[]);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    
    if (!type) {
      throw new Error('Entry type must be selected');
    } 
    
    if (type === 'HealthCheck') {
      let entryValueObject = {
        type,
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
        // substract one due to the Rating value
        healthCheckRating: Number(healthCheckRating) - 1
      };
      onSubmit(patientId,entryValueObject);
    } else if (type === 'OccupationalHealthcare') {
      let entryValueObject = {
        type,
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
        employerName,
        sickLeave: sickLeave
        ? {
          startDate: sickLeaveStart,
          endDate: sickLeaveEnd
        }
        : undefined,
        
      };
      onSubmit(patientId,entryValueObject);
    } else if (type === 'Hospital') {
     let entryValueObject = {
        type,
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
        discharge: discharge
        ? {
          date: dischargeDate,
          criteria: dischargeCriteria
        }
        : undefined
      };
      onSubmit(patientId,entryValueObject);
    }
  };

  const selectEntryType = (event: React.MouseEvent<HTMLElement>, typeSelection: "HealthCheck" | "OccupationalHealthcare"  | "Hospital") => {
    event.preventDefault();
    setType(typeSelection);
  };
  
  const entryTypeToString = (type: "HealthCheck" | "OccupationalHealthcare"  | "Hospital" | undefined): string => {
    switch(type) {
      case 'HealthCheck':
        return 'Health Check';
      case 'Hospital':
        return 'Hospital';
      case 'OccupationalHealthcare':
        return 'Occupational Healthcare';
      default:
        return '';
    }
  };

  if (!diagnosisCodeData) {
    console.log('Diagnosis Codes data loading...');
  }

  return (
    <div>
      <h2>Add new {entryTypeToString(type)} entry</h2>
      <ToggleButtonGroup
        sx={{ mb: 1 }}
        exclusive
        value={type} 
        onChange={selectEntryType}
        >
        <ToggleButton value="HealthCheck">Health Check</ToggleButton>
        <ToggleButton value="OccupationalHealthcare">Occupational Healthcare</ToggleButton>
        <ToggleButton value="Hospital">Hospital</ToggleButton>
      </ToggleButtonGroup>
      <form onSubmit={addEntry}>
        {!type && <p>Select entry type, please.</p>}
        {type && <>
          <TextField
            required
            label="Description"
            placeholder="Type entry description here.."
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            sx={{ mb: 1 }}
          />
          <FormControl fullWidth sx={{ my: 1 }} >
            <InputLabel
              required
              variant="outlined"
              htmlFor="entry-date-input">
                Date</InputLabel>
            <OutlinedInput 
              type="date"
              id="entry-date-input"
              placeholder="dd.mm.yyyy"
              required
              notched // does not work here
              label="Date" // this prevents the <InputLabel> strikethrough bug
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
          </FormControl>
          <TextField
            required
            label="Specialist"
            placeholder="Title. Lastname"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            sx={{ mb: 1 }}
          />
          <Chip
            label="Optional"
            title="Diagnosis Codes fields is optional"
            variant="outlined"
            sx={{ my: 1 }}
          />
          <FormControl
            sx={{ my: 1 }}
            fullWidth
            variant='filled'
          >
            <InputLabel>Diagnosis Codes</InputLabel>
            <Select
              multiple
              value={diagnosisCodes}
              onChange={({ target }) => {console.log(target.value);setDiagnosisCodes(target.value as Array<string>)}}
              renderValue={diagnosisCodes => diagnosisCodes.join(', ')}
            >
            {diagnosisCodeData && Object.keys(diagnosisCodeData).map(dc =>
              <MenuItem key={dc} value={dc} >
                <Checkbox checked={diagnosisCodes.indexOf(dc) > -1 } />
                
                {dc} - {diagnosisCodeData[dc].name}
              </MenuItem> 
              )}
            </Select>
            <FormHelperText sx={{ my: 1 }}>
              Select diagnosis codes
            </FormHelperText>
          </FormControl>
          {type === 'HealthCheck' && <div>
            <HealthCheckFormElements
              healthCheckRating={healthCheckRating}
              setHealthCheckRating={setHealthCheckRating}
            />
          </div>
          }

          {type === 'OccupationalHealthcare' &&
            <div>
              <Divider textAlign="left">Occupational Healthcare specific fields</Divider>
              <TextField
                required
                label="Employer name"
                placeholder="Name of the employer"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
                sx={{ my: 1 }}
              />

              Sick leave <Switch checked={sickLeave} onChange={() => setSickLeave(!sickLeave)} />
              <Box>
              <FormControl
                sx={{ my: 1 }}
                error={
                  sickLeaveStart > sickLeaveEnd
                    ? true
                    : false
                }
              >
                <InputLabel
                  required
                  variant="outlined"
                  shrink // the label is on the
                  htmlFor="sickleave-start-date-input">
                    Start Date</InputLabel>
                <OutlinedInput 
                  type="date"
                  id="sickleave-start-date-input"
                  placeholder="dd.mm.yyyy"
                  notched // label doesn't get strike through
                  required={sickLeave}
                  label="Start Date" // this prevents the <InputLabel> strikethrough bug
                  disabled={!sickLeave}
                  // fullWidth
                  value={sickLeaveStart}
                  onChange={({ target }) => setSickLeaveStart(target.value)}
                  sx={{ mb: 1 }}
                />
                {/* <FormHelperText error>
                  Choose a valid date range
                </FormHelperText> */}
              </FormControl>
              <FormControl
                sx={{ my: 1 }}
                error={
                  sickLeaveStart > sickLeaveEnd
                    ? true
                    : false
                }
              >
                <InputLabel
                  required
                  variant="outlined"
                  shrink // the label is on the
                  htmlFor="sickleave-end-date-input">
                    End Date</InputLabel>
                <OutlinedInput 
                  type="date"
                  notched
                  placeholder="dd.mm.yyyy"
                  id="sickleave-end-date-input"
                  required={sickLeave}
                  disabled={!sickLeave}
                  // fullWidth
                  label="End Date" // notched doesn't seem to work
                  value={sickLeaveEnd}
                  onChange={({ target }) => setSickLeaveEnd(target.value)}
                  sx={{ mb: 1 }}
                />
              </FormControl>
              </Box>
            </div>
          }
          {type === 'Hospital' &&
            <div>
              <Divider textAlign="left">Hospital specific fields</Divider>
              Discharge <Switch checked={discharge} onChange={() => setDischarge(!discharge)} />
            <FormControl fullWidth sx={{ my: 1 }} >
              <InputLabel
                required
                shrink
                variant="outlined"
                htmlFor="discharge-date-input">
                  Discharge Date</InputLabel>
              <OutlinedInput 
                required={discharge}
                disabled={!discharge}
                type="date"
                id="discharge-date-input"
                placeholder="dd.mm.yyyy"
                notched // does not work here
                label="Discharge Date" // this prevents the <InputLabel> strikethrough bug
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
              />
              </FormControl>
              <TextField
                required={discharge}
                disabled={!discharge}
                label="Discharge criteria"
                placeholder="Discharge criteria"
                fullWidth
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
                sx={{ mb: 1 }}
              />
            </div>
          }
      </>}

        <Divider sx={{ my: 2 }}></Divider>

        <Grid sx={{ my: 1 }}>
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
