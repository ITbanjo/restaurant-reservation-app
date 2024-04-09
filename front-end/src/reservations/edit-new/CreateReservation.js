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
    <div>
      <h1>Create Reservation</h1>
      <ReservationForm
        emptyReservationData={emptyReservationData}
        newReservation={newReservation}
        setNewReservation={setNewReservation}
      />
    </div>
  );
}

export default CreateReservation;
