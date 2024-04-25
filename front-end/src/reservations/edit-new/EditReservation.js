import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReservationByReservationId } from "../../utils/api";
import ReservationForm from "./ReservationForm";

function EditReservation() {
  const { reservation_id } = useParams();
  const [editReservation, setEditReservation] = useState({});

  useEffect(getReservation, []);

  async function getReservation() {
    try {
      setEditReservation(await getReservationByReservationId(reservation_id));
    } catch (error) {
      throw error;
    }
  }

  return (
    <div>
      <h1>Edit Reservation</h1>
      <ReservationForm
        //emptyReservationData={""}
        reservationData={editReservation}
        setReservationData={setEditReservation}
        edit={true}
      />
    </div>
  );
}

export default EditReservation;
