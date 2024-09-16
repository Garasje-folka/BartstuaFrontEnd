import { CardElement } from "@stripe/react-stripe-js";
import { Form } from "react-bootstrap";
import {
  cardElementOptions,
  CardElementWrapper,
  CardInfoWrapper,
} from "./cardInfoField.styled";
import { InputFieldSize } from "./inputField";

export type CardInfoFieldProps = {
  className?: string;
  label?: string;
};

export const CardInfoField: React.FC<CardInfoFieldProps> = (
  props: CardInfoFieldProps
) => {
  const { className, label } = props;

  return (
    <CardInfoWrapper
      className={className}
      $largeSpacing={false}
      $size={InputFieldSize.REGULAR}
    >
      {label ? <Form.Label>{label}</Form.Label> : undefined}
      <CardElementWrapper>
        <CardElement options={cardElementOptions} />
      </CardElementWrapper>
    </CardInfoWrapper>
  );
};
