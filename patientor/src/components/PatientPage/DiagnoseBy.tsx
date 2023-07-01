import { Divider } from "@mui/material";

interface DiagnoseByProp {
  specialist: string;
}

const DiagnoseBy = (props: DiagnoseByProp) => {
  const specialist = props.specialist;

  return (
    <div>
      <br />
      <Divider textAlign="left">Diagnose by</Divider>
        {specialist}
    </div>
  );
};

export default DiagnoseBy;