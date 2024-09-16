import styled from "styled-components";

export const CheckoutCartItemWrapper = styled.div`
  background-color: ${({ theme }) =>
    theme.colorPalette.blended.default + theme.card.BACKGROUND_OPACITY_SUFIX};
  box-shadow: ${({ theme }) => theme.shadow.MINIMAL};

  padding: 20px;
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.radius.SLIGHTLY_ROUND};

  display: flex;
  gap: 30px;
`;

export const Image = styled.img`
  --image-size: 100px;
  width: var(--image-size);
  height: var(--image-size);
  border-radius: ${({ theme }) => theme.radius.SLIGHTLY_ROUND};
`;
