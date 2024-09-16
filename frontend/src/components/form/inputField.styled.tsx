import { Form } from "react-bootstrap";
import styled, { css } from "styled-components";
import { Icon } from "../../icons";
import { InputFieldSize } from "./inputField";

interface ErrorProps {
  serious?: boolean;
}

export const Error = styled.div<ErrorProps>`
  color: ${({ serious, theme }) =>
    serious ? theme.form.colors.ERROR : theme.form.colors.WARNING};
`;

const getMaxWidth = (size?: InputFieldSize) => {
  switch (size) {
    case InputFieldSize.SMALL:
      return "250px";
    default:
      // InputFieldSize.REGULAR
      return "400px";
  }
};

export const StyledFormGroup = styled(Form.Group)``;

interface StyledFormControlProps {
  $isError: boolean;
  $serious: boolean;
}

const fieldRadius = css`
  border-radius: ${({ theme }) => theme.radius.ROUND};
`;

const fieldHeight = css`
  height: 40px;
`;

export const StyledFormControl = styled(Form.Control)<StyledFormControlProps>`
  border-color: transparent;
  box-shadow: ${({ theme }) => theme.shadow.MINIMAL};
  background-color: transparent;
  padding-left: 25px;
  ${fieldRadius}
  ${fieldHeight}

  &:focus {
    background-color: transparent;
  }

  ${({ $isError, $serious, theme }) =>
    $isError &&
    css`
      border-color: ${$serious
        ? theme.form.colors.ERROR
        : theme.form.colors.WARNING};

      &:focus {
        border-color: ${$serious
          ? theme.form.colors.ERROR
          : theme.form.colors.WARNING};
      }
    `};
`;

interface WrapperProps {
  $largeSpacing: boolean;
  $size?: InputFieldSize;
}

export const Wrapper = styled.div<WrapperProps>`
  background-color: white;
  ${fieldRadius}
  position: relative;

  margin-bottom: ${({ theme, $largeSpacing }) =>
    $largeSpacing
      ? theme.alignment.margin.LARGE
      : theme.alignment.margin.REGULAR};
  margin-top: ${({ theme, $largeSpacing }) =>
    $largeSpacing
      ? theme.alignment.margin.LARGE
      : theme.alignment.margin.REGULAR};
  max-width: ${({ $size }) => getMaxWidth($size)};
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  ${fieldHeight}
  display: flex;
  align-items: center;
  margin-left: 5px;
  pointer-events: none;
`;

export const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.form.colors.GREYED_OUT};
`;
