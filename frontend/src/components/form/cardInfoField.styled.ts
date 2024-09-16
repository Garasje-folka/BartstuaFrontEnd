import styled from "styled-components";
import { Wrapper } from "./inputField.styled";

export const cardElementOptions = {
  style: {
    base: {
      color: "#32325d",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export const CardInfoWrapper = styled(Wrapper)``;

export const CardElementWrapper = styled.div`
  border-radius: ${({ theme }) => theme.radius.ROUND};
  box-shadow: ${({ theme }) => theme.shadow.MINIMAL};
  padding: 10px;
  box-sizing: border-box;
`;
