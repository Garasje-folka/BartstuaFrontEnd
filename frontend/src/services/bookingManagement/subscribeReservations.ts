import { auth, firestore } from "../fireConfig";
import { createError } from "utils/dist/helpers";
import { userManagementErrorCodes } from "../userManagement/constants";
import {
  BookingReservationData as FullSaunaReservationData,
  BookingType,
  DropInReservationData,
} from "utils/dist/bookingManagement/types";
import { Doc } from "utils/dist/types";
import {
  BOOKING_RESERVATIONS,
  DROP_IN_RESERVATIONS,
} from "utils/dist/bookingManagement/constants";

export const onReservationsChanged = (reservationType: BookingType) => {
  const reservationCollection =
    reservationType === BookingType.booking
      ? BOOKING_RESERVATIONS
      : DROP_IN_RESERVATIONS;

  type DataType = typeof reservationType extends BookingType.booking
    ? FullSaunaReservationData
    : DropInReservationData;
  return (callback: (reservations: Doc<DataType>[]) => void): (() => void) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw createError(userManagementErrorCodes.ERROR_NO_USER);
    }
    const reservationsRef = firestore
      .collection(reservationCollection)
      .where("uid", "==", currentUser.uid)
      .where("status", "==", "active");

    const unsubscribe = reservationsRef.onSnapshot((querySnapshot) => {
      const reservations = querySnapshot.docs.map((doc) => {
        const data = doc.data() as DataType;
        return {
          data: data,
          id: doc.id,
        } as Doc<DataType>;
      });
      callback(reservations);
    });
    return () => {
      unsubscribe();
    };
  };
};
