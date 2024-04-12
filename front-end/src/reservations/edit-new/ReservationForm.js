import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";

function ReservationForm({
  emptyReservationData,
  newReservation,
  setNewReservation,
}) {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(null);

  function handleChange(event) {
    if (event.target.name === "people") {
      setNewReservation({
        ...newReservation,
        [event.target.name]: Number(event.target.value),
      });
    } else {
      setNewReservation({
        ...newReservation,
        [event.target.name]: event.target.value,
      });
      if (event.target.name === "reservation_date") {
        handleDateInputValidation(event.target.value);
      }
    }
  }

  function handleDateInputValidation(date) {
    const todayValue = Date.parse(new Date().toUTCString().slice(0, 16));
    const resDateValue = Date.parse(new Date(date).toUTCString().slice(0, 16));
    const getWeekdayName = new Date(date).toUTCString().slice(0, 3);

    if (resDateValue < todayValue && getWeekdayName === "Tue") {
      setErrorMessage({
        message: `Reservation cannot be made on a Tuesday and must also be on a future date.`,
      });
    } else if (resDateValue < todayValue) {
      setErrorMessage({ message: "Reservation must be on a future date." });
    } else if (getWeekdayName === "Tue") {
      setErrorMessage({
        message: "Reservation cannot be made on a Tuesday.",
      });
    } else {
      setErrorMessage(null);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await createReservation(newReservation);
      setNewReservation(emptyReservationData);
      history.push(`/dashboard?date=${newReservation.reservation_date}`);
    } catch (error) {
      throw error;
    }
  }

  function handleCancel() {
    setNewReservation(emptyReservationData);
    history.goBack();
  }

  return (
    <div>
      <ErrorAlert error={errorMessage} />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="first_name">First Name</label>
          <input
            id="first_name"
            value={newReservation.first_name}
            name="first_name"
            placeholder="First Name"
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label for="last_name">Last Name</label>
          <input
            id="last_name"
            value={newReservation.last_name}
            name="last_name"
            placeholder="Last Name"
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label for="mobile_number">Mobile Number</label>
          <input
            id="mobile_number"
            value={newReservation.mobile_number}
            name="mobile_number"
            type="tel"
            placeholder="xxx-xxx-xxxx"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label for="reservation_date">Reservation Date</label>
          <input
            id="reservation_date"
            value={newReservation.reservation_date}
            name="reservation_date"
            type="date"
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label for="reservation_time">Reservation Time</label>
          <input
            id="reservation_time"
            value={newReservation.reservation_time}
            name="reservation_time"
            type="time"
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label for="people">Number of Guests</label>
          <input
            id="people"
            value={newReservation.people}
            name="people"
            type="number"
            placeholder="Number of Guests"
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>

        <div>
          <button onClick={handleCancel} className="btn btn-secondary mr-1">
            Cancel
          </button>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
