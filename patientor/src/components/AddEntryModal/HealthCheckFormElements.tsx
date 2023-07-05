import Divider from "@mui/material/Divider/Divider";
import { healthRatingInformation } from "../PatientPage/EntryHeader";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import styled from "@mui/material/styles/styled";
import { useState } from "react";
import Rating, { IconContainerProps } from "@mui/material/Rating/Rating";

interface Props {
  healthCheckRating: number | null; 
  setHealthCheckRating: React.Dispatch<React.SetStateAction<number | null>>;
}
const HealthCheckFormElements = ({ healthCheckRating, setHealthCheckRating }: Props) => {
  
  // Add Health Check Rating selection labels:
  // https://mui.com/material-ui/react-rating/#hover-feedback
  const [healthRatingHover, setHealthRatingHover] = useState(-1);
 
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
      <Divider textAlign="left">Health Check specific fields</Divider>
      <Typography sx={{ my: 1 }}  variant="subtitle1">
        Choose a Health Check Rating
      </Typography>
      <Box sx={{ my: 1, display: 'flex' }}>
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
        <Box fontSize="large" sx={{ ml: 2}}>
          {healthRatingInformation[healthRatingHover !== -1
            ? healthRatingHover - 1
            : healthCheckRating - 1
          ].description}
        </Box>
      )}
      {healthCheckRating === null && (
        <Box fontSize="large" sx={{ ml: 2}}>
          {healthRatingHover !== -1
            ? healthRatingInformation[healthRatingHover - 1].description
            : ""
          }
        </Box>
      )}
    </Box>
    </div>
  );
};

export default HealthCheckFormElements;
