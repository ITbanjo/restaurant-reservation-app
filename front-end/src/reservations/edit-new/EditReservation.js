import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReservationByReservationId } from "../../utils/api";
import ReservationForm from "./ReservationForm";

function EditReservation() {
  const { reservation_id } = useParams();
  const [editReservation, setEditReservation] = useState({});

  useEffect(getReservation, []);

  async function getReservation() {
    const abortController = new AbortController();
    try {
      setEditReservation(
        await getReservationByReservationId(reservation_id),
        abortController.signal
      );
    } catch (error) {
      throw error;
    }
    return () => abortController.abort();
  }

  return (
    <div className="col-md-6 mt-3">
      <h3>Edit Reservation</h3>
      <ReservationForm
        reservationData={editReservation}
        setReservationData={setEditReservation}
        edit={true}
      />
    </div>
  );
}

export default EditReservation;
