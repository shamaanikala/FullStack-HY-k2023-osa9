import { Box, Button, Checkbox, Chip, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Switch, TextField, ToggleButton, ToggleButtonGroup, styled, } from "@mui/material";
import Rating, { IconContainerProps } from '@mui/material/Rating';
import { Diagnosis, EntryFormValues } from "../../types";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { todayString } from "../../utils";
import diagnoseService from '../../services/diagnoses';
import { healthRatingInformation } from "../PatientPage/EntryHeader";
import FavoriteIcon from '@mui/icons-material/Favorite';

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

  // Add Health Check Rating selection labels:
  // https://mui.com/material-ui/react-rating/#hover-feedback
  const [healthRatingHover, setHealthRatingHover] = useState(-1);

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

  // https://mui.com/material-ui/react-rating/#radio-group
  const RatingHeatlthCheckRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
      color: theme.palette.action.disabled,
    },
  }));

  const healthCheckRatingIcons: {
    [index: string]: {
      icon: React.ReactElement;
      label: string;
    };
  } = {
    // the index must start from 1
    1: {
      icon: <FavoriteIcon fontSize="large" sx={{ color: healthRatingInformation[0].color }} />,
      label: healthRatingInformation[0].description,
    },
    2: {
      icon: <FavoriteIcon fontSize="large" sx={{ color: healthRatingInformation[1].color }} />,
      label: healthRatingInformation[1].description,
    },
    3: {
      icon: <FavoriteIcon fontSize="large" sx={{ color: healthRatingInformation[2].color }} />,
      label: healthRatingInformation[2].description,
    },
    4: {
      icon: <FavoriteIcon fontSize="large" sx={{ color: healthRatingInformation[3].color }} />,
      label: healthRatingInformation[3].description,
    }
  };

  const IconContainer = (props: IconContainerProps) => {
    const { value, ...other } = props;
    return <span {...other}>{healthCheckRatingIcons[value].icon}</span>;
  };

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
          <TextField
            required
            label="Date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
            sx={{ mb: 1 }}
          />
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
            <Divider textAlign="left">Health Check specific fields</Divider>
            <Box sx={{ my: 1, display: 'flex' }} >
            <RatingHeatlthCheckRating
              IconContainerComponent={IconContainer}
              max={4} // needs this, otherwise iterates to 5
              onChange={(event, newValue) => setHealthCheckRating(newValue)}
              onChangeActive={(event, newHover) => setHealthRatingHover(newHover)}
              // the Rating indices are 1-4 but rating is 0-3
              // handle this within the onSubmit
              value={Number(healthCheckRating)}
              getLabelText={(value: number) => healthCheckRatingIcons[value].label}
              highlightSelectedOnly
            /> 
            {healthCheckRating !== null && (
              <Box sx={{ ml: 2}}>
                {healthRatingInformation[healthRatingHover !== -1
                  ? healthRatingHover - 1
                  : healthCheckRating - 1
                ].description}
              </Box>
            )}
            {healthCheckRating === null && (
              <Box sx={{ ml: 2}}>
                {healthRatingHover !== -1
                  ? healthRatingInformation[healthRatingHover - 1].description
                  : ""
                }
              </Box>
            )}
          </Box>
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
              <TextField
                required={sickLeave}
                disabled={!sickLeave}
                label="Sick leave start date"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={sickLeaveStart}
                onChange={({ target }) => setSickLeaveStart(target.value)}
                sx={{ mb: 1 }}
              />
              <TextField
                required={sickLeave}
                disabled={!sickLeave}
                label="Sick leave end"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={sickLeaveEnd}
                onChange={({ target }) => setSickLeaveEnd(target.value)}
                sx={{ mb: 1 }}
              />
            </div>
          }
          {type === 'Hospital' &&
            <div>
              <Divider textAlign="left">Hospital specific fields</Divider>
              Discharge <Switch checked={discharge} onChange={() => setDischarge(!discharge)} />
              <TextField
                required={discharge}
                disabled={!discharge}
                label="Discharge date"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
                sx={{ my: 1 }}
              />
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
