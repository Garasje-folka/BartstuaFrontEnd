import styled from "styled-components";
import { Card } from "../../components/card";
import { Heading } from "../../components/text";

export const StyledCard = styled(Card)`
  display: grid;
  grid-template-columns: 500px 1fr;
  overflow: hidden;
  padding: 0;
`;

const InnerContainer = styled.div`
  padding: 30px;
  box-sizing: border-box;
`;

export const LeftContainer = styled(InnerContainer)`
  background-color: ${({ theme }) => theme.colorPalette.blended.default + "aa"};
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};

  display: flex;
  flex-direction: column;

  gap: 20px;
`;

export const RightContainer = styled(InnerContainer)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledHeading = styled(Heading)`
  margin-top: 30px;
`;
