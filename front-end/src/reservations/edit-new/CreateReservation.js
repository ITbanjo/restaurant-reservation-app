import React, { useState } from "react";
import ReservationForm from "./ReservationForm";

function CreateReservation() {
  const emptyReservationData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };
  const [newReservation, setNewReservation] = useState(emptyReservationData);

  return (
    <div className="col-md-6 mt-3">
      <h3>Create Reservation</h3>
      <ReservationForm
        reservationData={newReservation}
        setReservationData={setNewReservation}
      />
    </div>
  );
}

export default CreateReservation;
