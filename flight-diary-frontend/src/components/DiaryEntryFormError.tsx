import { DiaryEntryFormErrorMessageProps } from "../types";

const DiaryEntryFormErrorMessage = (props: DiaryEntryFormErrorMessageProps) => {
  const message = props.message;
  const errorMessageStyle = {
    color: 'red',
  };

  return (
    <>
      <p style={errorMessageStyle}>{message}</p>
    </>
  );
};

export default DiaryEntryFormErrorMessage;