import { Form } from "react-bootstrap";
import { Error, StyledFormGroup, StyledFormControl } from "./inputField.styled";

declare type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

enum InputFieldSize {
  REGULAR = "REGULAR",
  SMALL = "SMALL",
}
interface InputFieldProps {
  label?: string;
  description?: string;
  type?: string;
  value?: string | number | string[];
  onChange?: (event: React.ChangeEvent<FormControlElement>) => void;
  errorText?: string;
  errorSerious?: boolean;
  size?: InputFieldSize;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const {
    type,
    value,
    description,
    label,
    onChange,
    errorText,
    errorSerious,
    size,
  } = props;

  return (
    <StyledFormGroup size={size}>
      {label ? <Form.Label>{label}</Form.Label> : undefined}
      {description ? <Form.Text>{"\n" + description}</Form.Text> : undefined}
      <StyledFormControl
        type={type}
        value={value}
        onChange={onChange}
        isError={!!errorText}
        serious={errorSerious}
      />
      <Error serious={errorSerious}>{errorText}</Error>
    </StyledFormGroup>
  );
};

InputField.defaultProps = {
  size: InputFieldSize.REGULAR,
};
export { InputField, InputFieldSize };
