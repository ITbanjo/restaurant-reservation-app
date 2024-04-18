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
        [event.target.name]: Number(event.target.value), //people input set to int
      });
    } else if (event.target.name === "mobile_number") {
      setNewReservation({
        ...newReservation,
        [event.target.name]: formatPhoneNumber(event.target.value), //phone input formatting
      });
    } else {
      setNewReservation({
        ...newReservation,
        [event.target.name]: event.target.value,
      });
    }
  }

  function formatPhoneNumber(value) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength <= 3) return phoneNumber;
    if (phoneNumberLength <= 6) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }

  function handleDateErrors(date, backendError) {
    const todayValue = Date.parse(new Date().toUTCString().slice(0, 16));
    const resDateValue = Date.parse(new Date(date).toUTCString().slice(0, 16));
    const weekdayName = new Date(date).toUTCString().slice(0, 3);

    if (resDateValue < todayValue && weekdayName === "Tue") {
      setErrorMessage({
        message: `Reservation cannot be made on a Tuesday and must also be set on a future date.`,
      });
    } else {
      setErrorMessage(backendError);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await createReservation(newReservation);
      setNewReservation(emptyReservationData);
      history.push(`/dashboard?date=${newReservation.reservation_date}`);
    } catch (error) {
      // display both past-date and Tuesday errors at once if necesarry
      handleDateErrors(newReservation.reservation_date, error);
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
            maxLength={14}
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
