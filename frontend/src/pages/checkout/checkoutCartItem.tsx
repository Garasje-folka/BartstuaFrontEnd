import { CheckoutCartItemWrapper, Image } from "./checkoutCartItem.styled";

export type CheckoutCartItemProps = {
  className?: string;
  name: string;
  imageUrl: string;
};

export const CheckoutCartItem: React.FC<CheckoutCartItemProps> = (
  props: CheckoutCartItemProps
) => {
  const { className, name, imageUrl } = props;

  return (
    <CheckoutCartItemWrapper className={className}>
      <Image src={imageUrl} />
      {name}
    </CheckoutCartItemWrapper>
  );
};
