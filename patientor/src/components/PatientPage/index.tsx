import { useParams } from "react-router-dom";
import { Patient } from "../../types";

interface Props {
  patient : Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>
}

// Ex9.21 patiet as prop from PatietnListPage?
// Or just send id as prop and fetch here byId
// or no props and use React Router useParams
const PatientPage = () => {
  console.log(useParams().id);
  return (
    <div>
      <i>Patient information here</i>
    </div>
  );
};

export default PatientPage;