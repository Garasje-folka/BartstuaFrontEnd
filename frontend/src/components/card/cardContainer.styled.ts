import styled, { css } from "styled-components";
import { CardColors, CardSizes } from "./cardContainer";

type CardProps = {
  size?: CardSizes;
  color?: CardColors;
};

export const BasicCard = styled.div<CardProps>`
  ${({ color }) => {
    switch (color) {
      case CardColors.PRIMARY: {
        return css`
          background-color: ${({ theme }) =>
            `${theme.colorPalette.primary.default}${theme.card.BACKGROUND_OPACITY_SUFIX}`};
        `;
      }
      case CardColors.PRIMARY_LIGHT: {
        return css`
          background-color: ${({ theme }) =>
            `${theme.colorPalette.primary.light}${theme.card.BACKGROUND_OPACITY_SUFIX}`};
        `;
      }
      default: {
        return css`
          background-color: ${({ theme }) =>
            "#ffffff" + theme.card.BACKGROUND_OPACITY_SUFIX};
        `;
      }
    }
  }}

  ${({ size }) => {
    switch (size) {
      case CardSizes.EXTRA_SMALL: {
        return css`
          flex-basis: 200px;
          max-width: 400px;
        `;
      }
      case CardSizes.SMALL: {
        return css`
          flex-basis: 400px;
        `;
      }
      case CardSizes.BIG: {
        return css`
          flex-basis: 700px;
        `;
      }
      case CardSizes.FILL_PAGE: {
        return css`
          max-width: ${({ theme }) => theme.page.width};
          min-height: ${({ theme }) => theme.page.minHeight};
          margin-top: 20px;
        `;
      }
    }
  }}

  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.radius.ROUND};
  padding: ${({ theme }) => theme.alignment.padding.LARGE};
  box-sizing: border-box;
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};
  overflow: hidden;
  flex-grow: 1;
`;

export const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: ${({ theme }) => theme.page.contentHeight};
  align-items: flex-start;
`;
