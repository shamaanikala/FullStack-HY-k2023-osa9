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
