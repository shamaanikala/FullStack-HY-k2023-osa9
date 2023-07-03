import Dialog from "@mui/material/Dialog/Dialog";
import { EntryFormValues } from "../../types";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import Divider from "@mui/material/Divider/Divider";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import AddEntryForm from "./AddEntryForm";
import Alert from "@mui/material/Alert/Alert";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm type={'HealthCheck'} onSubmit={onSubmit} onCancel={onClose}/>
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;