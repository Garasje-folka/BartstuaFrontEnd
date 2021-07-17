import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { addReservationToTransaction } from "./helpers";
import {
  ReservationData,
  reservationDataSchema,
} from "utils/dist/bookingManagement/types";
import { checkValidEventDate } from "./helpers";
import { checkAuthentication, checkData } from "../helpers";

export const addReservation = functions.https.onCall(
  async (data: ReservationData, context) => {
    checkData(data, reservationDataSchema);
    checkValidEventDate(data.date);

    const auth = checkAuthentication(context.auth);

    await admin.firestore().runTransaction(async (transaction) => {
      await addReservationToTransaction(transaction, data, auth.uid);
    });
  }
);
