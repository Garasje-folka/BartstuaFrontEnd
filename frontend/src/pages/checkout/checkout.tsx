import { FormEvent, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useTranslation } from "react-i18next";
import { FormContainer, InputField, SubmitButton } from "../../components/form";
import { CardHeader, CardSizes } from "../../components/card";
import { currentUserSelector } from "../../redux/selectors";
import { useSelector } from "react-redux";
import {
  StyledCard as Card,
  LeftContainer,
  RightContainer,
  StyledHeading,
} from "./checkout.styled";
import { useHistory } from "react-router-dom";
import { HOME } from "../../router/routeConstants";
import { Notification, NotificationType } from "../../components/notification";
import { validate } from "email-validator";
import { useEffect } from "react";
import { PaymentIntent } from "@stripe/stripe-js";
import {
  confirmBookingPaymentIntent,
  createBookingPaymentIntent,
} from "../../services/paymentManagement";
import { refreshReservationTimestamps } from "../../services/bookingManagement";
import { CardInfoField } from "../../components/form/cardInfoField";
import SaunaData from "./dummy.json";
import { CheckoutCartItem } from "./checkoutCartItem";
import { dropInReservationsSelector } from "../../redux/ducks/dropInReservations";
import { fullSaunaReservationsSelector } from "../../redux/ducks/fullSaunaReservations";
import { Heading } from "../../components/text";

const Checkout = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [paymentError, setPaymentError] = useState<string | undefined>(
    undefined
  );
  const [paymentIntent, setPaymentIntent] = useState<
    PaymentIntent | undefined
  >();
  const stripe = useStripe();
  const elements = useElements();

  const { t } = useTranslation();
  const currentUser = useSelector(currentUserSelector);
  const history = useHistory();
  const dropInReservations = useSelector(dropInReservationsSelector);
  const fullSaunaReservations = useSelector(fullSaunaReservationsSelector);

  useEffect(() => {
    // TODO: Add support for guest users
    refreshReservationTimestamps()
      .then(() => {
        // TODO: Attach email at confirmation if guest user
        if (!currentUser?.email) return;
        return createBookingPaymentIntent(currentUser.email);
      })
      .then((res) => setPaymentIntent(res));
  }, [currentUser?.email]);

  const onEmailChanged = (newEmail: string) => {
    if (!validate(newEmail)) {
      setEmailError("Ugyldig e-post");
    } else {
      setEmailError(undefined);
    }

    setEmail(newEmail);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !currentUser || !paymentIntent?.client_secret)
      return;

    if (!currentUser.email && !validate(email)) {
      setEmailError("Ugyldig e-post");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) return; // TODO: Throw error?

    // TODO: Assert that no reservations have expired?

    try {
      //await refreshReservationTimestamps();
      const paymentMethod = await stripe.createPaymentMethod({
        type: "card",
        card: card,
      });

      let resultIntent = await confirmBookingPaymentIntent(
        paymentIntent.id,
        paymentMethod.paymentMethod?.id
      );

      if (
        resultIntent.status === "requires_action" &&
        resultIntent.client_secret
      ) {
        // 3D secure payment
        await stripe.handleCardAction(resultIntent.client_secret);
        // Confirm payment on server side again
        resultIntent = await confirmBookingPaymentIntent(paymentIntent.id);
      }

      if (resultIntent?.status === "succeeded") {
        // TODO: Redirect to success page
        history.push(HOME);
      } else {
        setPaymentError("Noe gikk galt!");
      }
    } catch (error) {
      setPaymentError("Noe gikk galt!");
    }
  };

  return (
    <Card size={CardSizes.FILL_PAGE}>
      <LeftContainer>
        <CardHeader title={t`label_checkout`} />
        <FormContainer onSubmit={handleSubmit}>
          {(!currentUser || !currentUser.email) && (
            <InputField
              label={t("label_email")}
              type="email"
              value={email}
              onChange={(event) => onEmailChanged(event.target.value)}
              errorSerious={false}
              errorText={emailError}
            />
          )}
          <CardInfoField label={t`label_credit_card_information`} />
          <SubmitButton
            label="Betal"
            disabled={!stripe || !elements || !!emailError}
          />
          {paymentError && (
            <Notification
              heading="Betaling feilet"
              type={NotificationType.ERROR}
            >
              {paymentError}
            </Notification>
          )}
        </FormContainer>
      </LeftContainer>
      <RightContainer>
        {dropInReservations.length > 0 && (
          <Heading type={Heading.types.HEADING3}>
            {t("label_drop_in_reservations")}
          </Heading>
        )}
        {dropInReservations
          .map(({ data, id }) => ({
            ...data,
            saunaData: SaunaData.find(({ id }) => id === data.location)?.data,
            bookingId: id,
          }))
          .map(
            ({ saunaData, bookingId }) =>
              saunaData && <CheckoutCartItem key={bookingId} {...saunaData} />
          )}
        {fullSaunaReservations.length > 0 && (
          <StyledHeading type={Heading.types.HEADING3}>
            {t("label_full_sauna_reservations")}
          </StyledHeading>
        )}
        {fullSaunaReservations
          .map(({ data }) => ({
            ...data,
            saunaData: SaunaData.find(({ id }) => id === data.location)?.data,
          }))
          .map(
            ({ saunaData }) => saunaData && <CheckoutCartItem {...saunaData} />
          )}
      </RightContainer>
    </Card>
  );
};

export { Checkout };
