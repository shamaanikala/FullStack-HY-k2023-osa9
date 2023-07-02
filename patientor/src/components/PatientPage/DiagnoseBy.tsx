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
        <h4>{specialist}</h4>
    </div>
  );
};

export default DiagnoseBy;